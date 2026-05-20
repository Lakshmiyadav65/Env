import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Select,
  Space,
  Tag,
  DatePicker,
  Spin,
  message,
  Input,
} from "antd";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Plus,
  Car,
  Battery,
  Lightbulb,
  Microchip,
  Search,
  Pencil,
  Download,
} from "lucide-react";
import { Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import pcfService from "../lib/pcfService";
import type { PCFBOMItem } from "../lib/pcfService";
import dayjs from "dayjs";
import { usePermissions } from "../contexts/PermissionContext";
import { useAuth } from "../contexts/AuthContext";

interface PCFRequestItem {
  id: string;
  requestNumber: string;
  productName: string;
  productIcon: React.ReactNode;
  status: string;
  submittedBy: string;
  submittedOn: string;
}

interface PCFFilters {
  search?: string;
  from_date?: string;
  to_date?: string;
  pcf_status?: string;
}

const PCFRequest: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { canCreate } = usePermissions();
  const { user } = useAuth();
  // Report download is a super-admin-only capability — clients only see their
  // own report when an admin emails it to them, not a self-serve download.
  const isSuperAdmin =
    user?.role?.toLowerCase() === "superadmin" ||
    user?.role?.toLowerCase() === "super admin" ||
    user?.role?.toLowerCase() === "enviraan" ||
    user?.role?.toLowerCase() === "admin";
  const [pageSize, setPageSize] = useState(10);
  const [pcfRequests, setPcfRequests] = useState<PCFRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  // Tracks which PCF row is currently downloading so we can show a spinner
  // and disable other actions on that row.
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadReport = async (id: string, requestNumber: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    try {
      const result = await pcfService.downloadPcfReport(id);
      if (result.success) {
        message.success(`Report downloaded for ${requestNumber}`);
      } else {
        message.error(result.message || "Failed to download report");
      }
    } finally {
      setDownloadingId(null);
    }
  };

  // API Stats
  const [apiStats, setApiStats] = useState<{
    total_pcf_count?: string;
    completed_count?: string;
    approved_count?: string;
    in_progress_count?: string;
    rejected_count?: string;
    draft_count?: string;
    pending_count?: string;
  } | null>(null);

  // Debounce search term - waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Helper function to get product icon based on category
  const getProductIcon = (categoryName: string): React.ReactNode => {
    const category = categoryName?.toLowerCase() || "";
    if (category.includes("battery") || category.includes("power")) {
      return <Battery className="text-green-600" size={20} />;
    } else if (category.includes("frame") || category.includes("chassis")) {
      return <Car className="text-purple-600" size={20} />;
    } else if (category.includes("light")) {
      return <Lightbulb className="text-yellow-600" size={20} />;
    } else if (category.includes("control") || category.includes("unit")) {
      return <Microchip className="text-blue-600" size={20} />;
    }
    return <Car className="text-indigo-600" size={20} />;
  };

  // Build filters object based on current state
  const buildFilters = useCallback((): PCFFilters => {
    const filters: PCFFilters = {};

    // Status filter - use pcf_status param
    if (statusFilter !== "all") {
      filters.pcf_status = statusFilter;
    }

    // Search filter (using debounced value)
    if (debouncedSearchTerm.trim()) {
      filters.search = debouncedSearchTerm.trim();
    }

    // Date range filter
    if (dateRange && dateRange[0] && dateRange[1]) {
      filters.from_date = dateRange[0].format("YYYY-MM-DD");
      filters.to_date = dateRange[1].format("YYYY-MM-DD");
    }

    return filters;
  }, [statusFilter, debouncedSearchTerm, dateRange]);

  // Fetch PCF BOM list from API
  const fetchPCFList = useCallback(async () => {
    setIsLoading(true);
    try {
      const filters = buildFilters();
      const result = await pcfService.getPCFBOMList(
        currentPage,
        pageSize,
        filters,
      );

      if (result.success && result.data && Array.isArray(result.data)) {
        // Helper function to format date
        const formatDate = (dateString: string): string => {
          try {
            const date = new Date(dateString);
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes.toString().padStart(2, "0");
            return `${day} ${month} ${year}, ${displayHours}:${displayMinutes} ${ampm}`;
          } catch (error) {
            return "N/A";
          }
        };

        // Transform API data to PCFRequestItem
        const transformedData: PCFRequestItem[] = result.data.map(
          (item: any) => {
            // Extract actual product name from product_details (new field)
            const productName =
              item.product_details?.product_name ||
              item.request_title ||
              "N/A";

            // Extract product category for icon
            const productCategoryName =
              item.product_category?.name ||
              item.product_category_name ||
              item.component_category?.name ||
              item.component_category_name ||
              "N/A";

            // Extract submitted by from nested structure
            const submittedBy =
              item.pcf_request_stages?.pcf_request_created_by?.user_name ||
              item.created_by_name ||
              "Unknown";

            // Extract created date
            const createdDate =
              item.pcf_request_stages?.pcf_request_created_date ||
              item.created_date ||
              item.createdDate;

            return {
              id: item.id,
              requestNumber: item.code || item.request_number || "N/A",
              productName: productName,
              productIcon: getProductIcon(productCategoryName),
              status: item.status || "Unknown",
              submittedBy: submittedBy,
              submittedOn: createdDate ? formatDate(createdDate) : "N/A",
            };
          },
        );

        setPcfRequests(transformedData);
        setTotalCount(result.total_count || transformedData.length);
        setTotalPages(result.total_pages || 1);

        // Set API stats
        if (result.stats) {
          setApiStats(result.stats);
        }

        // Debug logging
        console.log("PCF List fetched:", {
          totalItems: transformedData.length,
          totalCount: result.total_count,
          totalPages: result.total_pages,
          stats: result.stats,
          sampleItem: transformedData[0],
        });
      } else {
        console.error("PCF List fetch failed:", {
          success: result.success,
          hasData: !!result.data,
          isArray: Array.isArray(result.data),
          result,
        });
        message.error(result.message || "Failed to fetch PCF requests");
        setPcfRequests([]);
      }
    } catch (error) {
      console.error("Error fetching PCF list:", error);
      message.error("An error occurred while fetching PCF requests");
      setPcfRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, buildFilters]);

  // Load data on component mount and when page/filters change
  useEffect(() => {
    fetchPCFList();
  }, [fetchPCFList]);

  // Reset to page 1 when filters change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearch = () => {
    // Immediately trigger search on Enter without waiting for debounce
    setDebouncedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
  ) => {
    setDateRange(dates);
    setCurrentPage(1);
  };

  // Use stats from API response for KPI cards
  const statusCounts = {
    total: parseInt(apiStats?.total_pcf_count || "0", 10),
    completed: parseInt(apiStats?.completed_count || "0", 10),
    inProgress: parseInt(apiStats?.in_progress_count || "0", 10),
    approved: parseInt(apiStats?.approved_count || "0", 10),
    rejected: parseInt(apiStats?.rejected_count || "0", 10),
    draft: parseInt(apiStats?.draft_count || "0", 10),
    pending: parseInt(apiStats?.pending_count || "0", 10),
  };

  const getStatusTag = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    const colorConfig: Record<string, string> = {
      "in-progress": "blue",
      "in progress": "blue",
      completed: "green",
      draft: "gold",
      rejected: "red",
      open: "cyan",
      approved: "green",
      pending: "orange",
    };
    const color = colorConfig[statusLower] || "default";
    return <Tag color={color}>{status || "Unknown"}</Tag>;
  };

  const reportColumn = {
    title: "Report",
    key: "report",
    width: 110,
    render: (_: any, record: PCFRequestItem) => {
      const isCompleted = record.status?.toLowerCase() === "completed";
      const isLoading = downloadingId === record.id;
      const button = (
        <Button
          type="text"
          disabled={!isCompleted || isLoading}
          loading={isLoading}
          onClick={() =>
            handleDownloadReport(record.id, record.requestNumber)
          }
          icon={
            !isLoading ? (
              <Download
                size={16}
                className="flex items-center justify-center mt-[5px]"
              />
            ) : undefined
          }
        >
          Download
        </Button>
      );
      return isCompleted ? (
        button
      ) : (
        <Tooltip title="Available only for completed PCF requests">
          <span>{button}</span>
        </Tooltip>
      );
    },
  };

  const columns: ColumnsType<PCFRequestItem> = [
    {
      title: "PCF Request Number",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 180,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 250,
      render: (_, record) => (
        <Space>
          {record.productIcon}
          <span>{record.productName}</span>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Submitted By",
      dataIndex: "submittedBy",
      key: "submittedBy",
      width: 200,
    },
    {
      title: "Submitted On",
      dataIndex: "submittedOn",
      key: "submittedOn",
      width: 200,
    },
    ...(isSuperAdmin ? [reportColumn] : []),
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => {
        const isDraft = record.status?.toLowerCase() === "draft";
        return (
          <Space>
            {isDraft ? (
              <Button
                type="text"
                onClick={() => navigate(`/pcf-request/${record.id}/edit`)}
                icon={
                  <Pencil
                    size={16}
                    className="flex items-center justify-center mt-[5px]"
                  />
                }
              >
                Edit
              </Button>
            ) : (
              <Button
                type="text"
                onClick={() => navigate(`/pcf-request/${record.id}`)}
                icon={
                  <Eye
                    size={16}
                    className="flex items-center justify-center mt-[5px]"
                  />
                }
              >
                View
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-emerald-50/40 border border-gray-100 shadow-sm p-6">
          {/* Decorative blurs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-green-200/40 to-emerald-200/30 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl" />

          <div className="relative">
            {/* Title Row */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 flex-shrink-0">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  PCF Request Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Streamlined carbon footprint tracking and approval workflow
                </p>
              </div>
            </div>

            {/* Donut + Legend Dashboard */}
            {(() => {
              const STATUS_CONFIG = [
                { key: "inProgress", label: "In Progress", color: "#3b82f6", Icon: Clock,        value: statusCounts.inProgress },
                { key: "completed",  label: "Completed",   color: "#14b8a6", Icon: CheckCircle,  value: statusCounts.completed },
                { key: "approved",   label: "Approved",    color: "#22c55e", Icon: CheckCircle,  value: statusCounts.approved },
                { key: "pending",    label: "Open",        color: "#f97316", Icon: Clock,        value: statusCounts.pending },
                { key: "draft",      label: "Draft",       color: "#f59e0b", Icon: AlertCircle,  value: statusCounts.draft },
                { key: "rejected",   label: "Rejected",    color: "#ef4444", Icon: XCircle,      value: statusCounts.rejected },
              ];

              const total = statusCounts.total;
              const safeTotal = Math.max(total, 1);
              const resolutionPct = Math.round(
                ((statusCounts.completed + statusCounts.approved) / safeTotal) * 100
              );

              // Donut chart math
              const SIZE = 220;
              const CENTER = SIZE / 2;
              const RADIUS = 82;
              const STROKE = 22;
              const CIRC = 2 * Math.PI * RADIUS;
              const GAP = 2; // tiny gap between segments in degrees

              let cumulative = 0;
              const arcs = STATUS_CONFIG
                .filter((s) => s.value > 0)
                .map((s) => {
                  const fraction = s.value / safeTotal;
                  const arcLen = Math.max(fraction * CIRC - GAP, 0);
                  const dashOffset = -cumulative * CIRC;
                  cumulative += fraction;
                  return { ...s, arcLen, dashOffset };
                });

              return (
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-center">
                  {/* Donut Chart */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 m-auto w-48 h-48 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-2xl" />
                    <svg
                      width={SIZE}
                      height={SIZE}
                      viewBox={`0 0 ${SIZE} ${SIZE}`}
                      className="relative drop-shadow-sm"
                    >
                      {/* Background track */}
                      <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS}
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth={STROKE}
                      />
                      {/* Colored arcs */}
                      <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
                        {arcs.map((s) => (
                          <circle
                            key={s.key}
                            cx={CENTER}
                            cy={CENTER}
                            r={RADIUS}
                            fill="none"
                            stroke={s.color}
                            strokeWidth={STROKE}
                            strokeLinecap="round"
                            strokeDasharray={`${s.arcLen} ${CIRC}`}
                            strokeDashoffset={s.dashOffset}
                            style={{
                              transition:
                                "stroke-dasharray 0.8s cubic-bezier(0.34, 1.2, 0.64, 1), stroke-dashoffset 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)",
                            }}
                          />
                        ))}
                      </g>
                      {/* Center labels */}
                      <text
                        x={CENTER}
                        y={CENTER - 18}
                        textAnchor="middle"
                        className="fill-slate-400"
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                        }}
                      >
                        TOTAL
                      </text>
                      <text
                        x={CENTER}
                        y={CENTER + 14}
                        textAnchor="middle"
                        className="fill-slate-900"
                        style={{ fontSize: 42, fontWeight: 800 }}
                      >
                        {total}
                      </text>
                      <text
                        x={CENTER}
                        y={CENTER + 36}
                        textAnchor="middle"
                        className="fill-emerald-600"
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {resolutionPct}% RESOLVED
                      </text>
                    </svg>
                  </div>

                  {/* Status Legend */}
                  <div className="space-y-1.5">
                    {STATUS_CONFIG.map((s) => {
                      const pct = Math.round((s.value / safeTotal) * 100);
                      return (
                        <div
                          key={s.key}
                          className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white shadow-sm"
                            style={{ background: s.color }}
                          />
                          <s.Icon
                            size={14}
                            className="text-slate-400 flex-shrink-0 group-hover:text-slate-600 transition-colors"
                          />
                          <span className="text-sm font-medium text-slate-700 w-[110px] flex-shrink-0">
                            {s.label}
                          </span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${pct}%`,
                                background: s.color,
                              }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-900 tabular-nums w-10 text-right">
                            {s.value}
                          </span>
                          <span className="text-xs text-slate-400 tabular-nums w-10 text-right">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Requests Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              PCF Requests
            </h2>
            <Space wrap>
              <Input
                placeholder="Search code, title, category..."
                prefix={<Search size={16} className="text-gray-400" />}
                size="large"
                className="w-[250px]"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onPressEnter={handleSearch}
                allowClear
              />
              <DatePicker.RangePicker
                size="large"
                format="DD MMM YYYY"
                placeholder={["Start Date", "End Date"]}
                value={dateRange}
                onChange={handleDateRangeChange}
                className="w-[260px]"
                allowClear
              />
              <Select
                className="w-[150px]"
                size="large"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                options={[
                  { label: "All Status", value: "all" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Completed", value: "Completed" },
                  { label: "Open", value: "Open" },
                  { label: "Draft", value: "Draft" },
                  { label: "Approved", value: "Approved" },
                  { label: "Rejected", value: "Rejected" },
                ]}
              />
              {canCreate("PCF Request") && (
                <Button
                  type="primary"
                  icon={<Plus size={16} />}
                  size="large"
                  onClick={() => navigate("/pcf-request/new")}
                  className="shadow-lg shadow-green-600/20"
                >
                  New Request
                </Button>
              )}
            </Space>
          </div>

          <Spin
            spinning={isLoading}
            indicator={<LoadingSpinner size="md" />}
          >
            <Table
              columns={columns}
              dataSource={pcfRequests}
              pagination={false}
              scroll={{ x: 1200 }}
              rowKey="id"
              className="rounded-xl overflow-hidden"
            />
          </Spin>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-gray-500 text-sm">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-900">
                {Math.min(currentPage * pageSize, totalCount)}
              </span>{" "}
              of <span className="font-medium text-gray-900">{totalCount}</span>{" "}
              entries
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              {Array.from(
                { length: Math.min(totalPages, 5) },
                (_, i) => i + 1,
              ).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-lg font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-600/20"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCFRequest;
