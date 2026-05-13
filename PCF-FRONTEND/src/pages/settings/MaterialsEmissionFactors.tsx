import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Leaf, Search } from "lucide-react";
import { Input, Select, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  materialsEmissionFactors,
  type MaterialEFRow,
  type Region,
} from "../../data/materialsEmissionFactors";

const { Option } = Select;

const REGION_COLORS: Record<Region, string> = {
  EU: "blue",
  IN: "orange",
  GLOBAL: "green",
};

const distinct = (values: string[]): string[] =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

const MaterialsEmissionFactors: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [layer1Filter, setLayer1Filter] = useState<string | undefined>();
  const [layer3Filter, setLayer3Filter] = useState<string | undefined>();
  const [layer4Filter, setLayer4Filter] = useState<string | undefined>();
  const [regionFilter, setRegionFilter] = useState<Region | undefined>();

  const layer1Options = useMemo(
    () => distinct(materialsEmissionFactors.map((r) => r.layer1)),
    []
  );
  const layer3Options = useMemo(
    () => distinct(materialsEmissionFactors.map((r) => r.layer3)),
    []
  );
  const layer4Options = useMemo(
    () => distinct(materialsEmissionFactors.map((r) => r.layer4)),
    []
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return materialsEmissionFactors.filter((row) => {
      if (layer1Filter && row.layer1 !== layer1Filter) return false;
      if (layer3Filter && row.layer3 !== layer3Filter) return false;
      if (layer4Filter && row.layer4 !== layer4Filter) return false;
      if (regionFilter && row.region !== regionFilter) return false;
      if (!q) return true;
      return (
        row.id.toLowerCase().includes(q) ||
        row.layer2.toLowerCase().includes(q) ||
        row.layer1.toLowerCase().includes(q) ||
        row.layer3.toLowerCase().includes(q) ||
        row.layer4.toLowerCase().includes(q) ||
        row.region.toLowerCase().includes(q)
      );
    });
  }, [search, layer1Filter, layer3Filter, layer4Filter, regionFilter]);

  const handleExport = () => {
    const headers = [
      "ID",
      "Scope",
      "Layer1",
      "Layer2",
      "Layer3",
      "Layer4",
      "Region",
      "Year",
      "EF Value",
      "Unit",
      "Data Source",
      "Category",
    ];
    const rows = filteredRows.map((r) => [
      r.id,
      r.scope,
      r.layer1,
      r.layer2,
      r.layer3,
      r.layer4,
      r.region,
      r.year.toString(),
      r.efValue.toString(),
      r.unit,
      r.dataSource,
      r.category,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `materials-emission-factors-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: ColumnsType<MaterialEFRow> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 110,
      fixed: "left",
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: (v: string) => (
        <span className="font-mono text-xs text-gray-700">{v}</span>
      ),
    },
    {
      title: "Scope",
      dataIndex: "scope",
      key: "scope",
      width: 90,
    },
    {
      title: "Layer1",
      dataIndex: "layer1",
      key: "layer1",
      width: 170,
    },
    {
      title: "Layer2",
      dataIndex: "layer2",
      key: "layer2",
      width: 280,
      sorter: (a, b) => a.layer2.localeCompare(b.layer2),
      render: (v: string) => (
        <span className="font-medium text-gray-900">{v}</span>
      ),
    },
    {
      title: "Layer3",
      dataIndex: "layer3",
      key: "layer3",
      width: 170,
    },
    {
      title: "Layer4",
      dataIndex: "layer4",
      key: "layer4",
      width: 200,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 100,
      render: (v: Region) => (
        <Tag color={REGION_COLORS[v]} className="font-medium">
          {v}
        </Tag>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 80,
    },
    {
      title: "EF Value",
      dataIndex: "efValue",
      key: "efValue",
      width: 100,
      sorter: (a, b) => a.efValue - b.efValue,
      render: (v: number) => (
        <span className="font-semibold text-gray-900">{v}</span>
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 140,
    },
    {
      title: "Data Source",
      dataIndex: "dataSource",
      key: "dataSource",
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 110,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/settings")}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Materials Emission Factors
                </h1>
                <p className="text-gray-500">
                  Categorized EF database — read-only reference data
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters + Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 pt-6 pb-4 flex flex-wrap items-center gap-3">
            <Input
              allowClear
              prefix={<Search className="h-4 w-4 text-gray-400" />}
              placeholder="Search by ID, material, layer, region…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72"
            />
            <Select
              allowClear
              placeholder="Layer1"
              value={layer1Filter}
              onChange={(v) => setLayer1Filter(v)}
              className="w-48"
            >
              {layer1Options.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
            <Select
              allowClear
              placeholder="Layer3"
              value={layer3Filter}
              onChange={(v) => setLayer3Filter(v)}
              className="w-48"
            >
              {layer3Options.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
            <Select
              allowClear
              placeholder="Layer4"
              value={layer4Filter}
              onChange={(v) => setLayer4Filter(v)}
              className="w-56"
            >
              {layer4Options.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
            <Select
              allowClear
              placeholder="Region"
              value={regionFilter}
              onChange={(v) => setRegionFilter(v)}
              className="w-32"
            >
              <Option value="EU">EU</Option>
              <Option value="IN">IN</Option>
              <Option value="GLOBAL">GLOBAL</Option>
            </Select>
            <div className="ml-auto text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredRows.length}
              </span>{" "}
              of {materialsEmissionFactors.length} rows
            </div>
          </div>

          <div className="px-6 pb-6">
            <Table<MaterialEFRow>
              rowKey="id"
              columns={columns}
              dataSource={filteredRows}
              size="middle"
              scroll={{ x: 1700 }}
              pagination={{
                pageSize: 25,
                showSizeChanger: true,
                pageSizeOptions: ["25", "50", "100", "200"],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsEmissionFactors;
