import { useEffect, useState } from "react";
import { Drawer } from "antd";
import { BookOpen, ExternalLink } from "lucide-react";
import { getKnowledgeBaseUrl } from "../lib/knowledgeBaseUrl";

interface KnowledgeBasePanelProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Right-side panel that embeds the standalone Knowledge Base app (a separate
 * instance / deployment) in an iframe. Keeping it as its own instance isolates
 * its router, bundle and styles from the main app; the iframe just surfaces it
 * inside the Enviraan layout instead of forcing a full page switch.
 */
const KnowledgeBasePanel: React.FC<KnowledgeBasePanelProps> = ({
  open,
  onClose,
}) => {
  const url = getKnowledgeBaseUrl();
  const [width, setWidth] = useState(720);
  // Mount the iframe only after the first open so the KB instance isn't loaded
  // until needed, then keep it alive to preserve in-frame navigation/scroll.
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (open) setHasOpened(true);
  }, [open]);

  useEffect(() => {
    const computeWidth = () =>
      setWidth(Math.min(820, Math.max(360, Math.round(window.innerWidth * 0.45))));
    computeWidth();
    window.addEventListener("resize", computeWidth);
    return () => window.removeEventListener("resize", computeWidth);
  }, []);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={width}
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <BookOpen size={20} className="text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Knowledge Base</div>
            <div className="text-sm text-gray-500">Guides &amp; documentation</div>
          </div>
        </div>
      }
      extra={
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700"
          title="Open the Knowledge Base in a new tab"
        >
          <ExternalLink size={16} />
          Open in new tab
        </a>
      }
      styles={{ body: { padding: 0, height: "100%" } }}
    >
      {hasOpened && (
        <iframe
          src={url}
          title="Knowledge Base"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      )}
    </Drawer>
  );
};

export default KnowledgeBasePanel;
