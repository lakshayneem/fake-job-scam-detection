import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import "./styles.css";
import FreePlanComponent from "./FreePlanComponent";
import ProPlanComponent from "./ProPlanComponent";
import EnterprisePlanComponent from "./EnterprisePlanComponent";

export default function Layout() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="pricing-container">
      <nav className="pricing-nav">
        <ul className="pricing-tabs">
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              className="pricing-tab"
              onClick={() => setSelectedTab(item)}
            >
              {item.label}
              {item === selectedTab ? (
                <motion.div className="pricing-underline" layoutId="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="pricing-icon-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pricing-icon"
          >
            {getTabContent(selectedTab.label)}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function getTabContent(label) {
  switch (label) {
    case "Free":
      return <FreePlanComponent />;
    case "Pro":
      return <ProPlanComponent />;
    case "Enterprise":
      return <EnterprisePlanComponent />;
    default:
      return "😋";
  }
}

const tabs = [
  { label: "Free" },
  { label: "Pro" },
  { label: "Enterprise" }
];
