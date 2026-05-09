import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

type View =
  | "dashboard"
  | "pos"
  | "machines"
  | "queue"
  | "analytics"
  | "settings";

interface Step {
  title: string;
  body: string;
  targetView: View;
  action?: string;
}

const STEPS: Step[] = [
  {
    title: "Welcome to the KaOten SEO Agent Showcase",
    body: "This portfolio demo mirrors the live SEO operations shell. You will see multi-tenant context, execution-runner state, offline resilience, and plan-gating in a safe environment.",
    targetView: "dashboard",
  },
  {
    title: "Switch Clients and Workspaces",
    body: "Use the dropdowns in the header to switch between client accounts and workspaces. Each tenant has its own isolated data context matching the real Firestore multi-tenant architecture.",
    targetView: "dashboard",
    action: "Go to Dashboard",
  },
  {
    title: "Try Different Role Views",
    body: "The Role Preview toggle (Owner / Manager / Staff) controls what's visible in the sidebar and dashboard. Backend stays as Super Admin — this is UI-only RBAC preview.",
    targetView: "settings",
    action: "Open Settings",
  },
  {
    title: "Proposal Queue — Task Lifecycle",
    body: "Create proposals, go offline (toggle your browser network), and watch tasks queue. Come back online and sync. Every state transition is recorded in the telemetry log below.",
    targetView: "pos",
    action: "Open Proposal Queue",
  },
  {
    title: "Execution Engine — Real-time State",
    body: "Toggle runner states between Idle, In Use, and Maintenance. In production this writes to Firestore and broadcasts via onSnapshot to all connected sessions.",
    targetView: "machines",
    action: "Open Execution Engine",
  },
  {
    title: "SEO Analytics — Plan Gating in Action",
    body: "SEO Analytics is locked to Growth plan and above. Switch to a Free plan tenant to see the upgrade gate, or switch to Growth to see the unlocked widget structure.",
    targetView: "analytics",
    action: "Open SEO Analytics",
  },
];

interface Props {
  onClose: () => void;
  onNavigate: (view: View) => void;
}

export const GuidedDemo = ({ onClose, onNavigate }: Props) => {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  const handleNext = () => {
    if (current.targetView) onNavigate(current.targetView);
    if (step < STEPS.length - 1) setStep(step + 1);
    else onClose();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="guided-demo-wrap">
      <div className="guided-demo-card">
        <div className="guided-demo-header">
          <div className="guided-demo-title-row">
            <Sparkles size={15} className="guided-demo-sparkle" />
            <span className="guided-demo-label">Demo Guide</span>
            <span className="guided-demo-step-count">
              {step + 1} / {STEPS.length}
            </span>
          </div>
          <button
            className="guided-demo-close"
            onClick={onClose}
            aria-label="Close demo guide"
          >
            <X size={15} />
          </button>
        </div>

        <div className="guided-demo-progress">
          <div
            className="guided-demo-progress-fill"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="guided-demo-body">
          <h3 className="guided-demo-step-title">{current.title}</h3>
          <p className="guided-demo-step-body">{current.body}</p>
        </div>

        <div className="guided-demo-footer">
          <button
            className="btn btn-ghost"
            onClick={handleBack}
            disabled={step === 0}
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <button
            className="btn btn-primary guided-demo-next"
            onClick={handleNext}
          >
            {step < STEPS.length - 1 ? (
              <>
                {current.action ?? "Next"}
                <ChevronRight size={14} />
              </>
            ) : (
              "Finish Tour"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
