import cx from "classnames";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { Icon } from "src/common-components";

export function Header({
  isEditing,
  selectionStatus,
  onClickEdit,
  onClickSettings,
  onClickCancel,
  onClickSelectAll,
  onClickDelete,
}: {
  isEditing: boolean;
  selectionStatus: "none" | "some" | "all";
  onClickEdit: MouseEventHandler<HTMLButtonElement>;
  onClickSettings: MouseEventHandler<HTMLButtonElement>;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
  onClickSelectAll: MouseEventHandler<HTMLButtonElement>;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
}) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    setScale(1 - Math.min(window.scrollY / (300 - 50), 1));
  }

  return (
    <Container scale={scale}>
      <Title scale={scale}>CHEAPEST!</Title>

      <ToolBar isVisible={!isEditing}>
        <IconButton icon="edit" onClick={onClickEdit} />

        <div className={cx("flex-auto")} />

        {/* <IconButton icon="settings" onClick={onClickSettings} /> */}
      </ToolBar>

      <ToolBar isVisible={isEditing}>
        <IconButton icon="arrow_back" onClick={onClickCancel} />

        <IconButton
          icon={
            selectionStatus === "none"
              ? "circle"
              : selectionStatus === "some"
              ? "adjust"
              : "check_circle"
          }
          fill={selectionStatus !== "none"}
          onClick={onClickSelectAll}
        />

        <div className={cx("flex-auto")} />

        <IconButton icon="delete" onClick={onClickDelete} />
      </ToolBar>
    </Container>
  );
}

function Container({ scale, children }: { scale: number; children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-none",
        "h-[300px]",

        "sticky",
        "top-0",

        "invisible",

        "z-[1]",
      )}
    >
      <div
        className={cx(
          "visible",

          "bg-[#00a080]",

          "grid",
          "relative",
        )}
        style={{ height: `${50 + (300 - 50) * scale}px` }}
      >
        {children}
      </div>
    </div>
  );
}

function Title({ scale, children }: { scale: number; children: ReactNode }) {
  return (
    <div
      className={cx(
        "grid",
        "place-items-center",

        "text-[#ffffff]",
        "tracking-[0.25ch]",
        "font-bold",

        "overflow-clip",
      )}
      style={{
        fontSize: `${20 + (40 - 20) * scale}px`,
        opacity: `${100 * scale}%`,
      }}
    >
      {children}
    </div>
  );
}

function ToolBar({ isVisible, children }: { isVisible: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        isVisible
          ? ["opacity-100", "visible", "pointer-events-auto"]
          : ["opacity-0", "invisible", "pointer-events-none"],
        "transition-all",

        "absolute",

        "w-full",
        "max-w-[600px]",
        "h-[50px]",

        "bottom-0",

        "flex",
        "flex-row",
        "justify-self-center",
      )}
    >
      {children}
    </div>
  );
}

function IconButton({
  icon,
  fill,
  onClick,
}: {
  icon: string;
  fill?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={cx(
        "grid",
        "place-items-center",

        "bg-[#ffffff00]",
        "transition-all",
        "duration-[500ms]",

        "p-[10px]",

        "text-[25px]",
        "text-[#ffffff]",

        "active:bg-[#fffffff0]",
        "active:text-[#00a080]",
        "active:duration-0",
      )}
      onClick={onClick}
    >
      <Icon icon={icon} fill={fill} />
    </button>
  );
}
