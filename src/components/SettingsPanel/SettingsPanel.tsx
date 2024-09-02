import cx from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import { Icon } from "src/common-components";
import { NumberField2 } from "./NumberField2";
import { TBunLogo } from "./TBunLogo";
import { TextField } from "./TextField";

export function SettingsPanel({
  isVisible,
  onClose,
  currency,
  decimalDigits,
  onSetCurrency,
  onSetDecimalDigits,
}: {
  isVisible: boolean;
  onClose: () => void;
  currency: string;
  decimalDigits: number;
  onSetCurrency: (currency: string) => void;
  onSetDecimalDigits: (decimalDigits: number) => void;
}) {
  return (
    <Container>
      <Backdrop isVisible={isVisible} onClick={onClose} />

      <Panel isVisible={isVisible}>
        <Header>
          <Title>Settings</Title>

          <Button icon="close" onClick={onClose} />
        </Header>

        <Body>
          <TextField
            label="Currency"
            defaultValue="THB"
            initialValue={currency}
            onChange={onSetCurrency}
          />

          <NumberField2
            label="Decimal Digits"
            defaultValue={2}
            initialValue={decimalDigits}
            onChange={onSetDecimalDigits}
          />
        </Body>

        <div className={cx("flex-auto")} onClick={onClose} />

        <TBunLogo />
      </Panel>
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "fixed",
        "inset-0",
        "z-[2]",

        "invisible",
      )}
    >
      {children}
    </div>
  );
}

function Backdrop({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={cx(
        "size-full",

        "bg-[#00000040]",

        isVisible
          ? ["visible", "opacity-100", "pointer-events-auto", "backdrop-blur-[2px]"]
          : ["invisible", "opacity-0", "pointer-events-none", "backdrop-blur-[0px]"],
        "transition-all",
        "duration-[500ms]",
      )}
      onClick={onClick}
    />
  );
}

function Panel({ isVisible, children }: { isVisible: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        "absolute",
        "top-0",
        "right-0",

        "w-[400px]",
        "max-w-full",
        "h-full",

        "bg-[#ffffff20]",
        "backdrop-blur-[50px]",
        "shadow-[0_10px_20px_0_#00000080]",

        isVisible ? ["visible"] : ["translate-x-[100%]"],
        "transition-all",
        "duration-[500ms]",

        "flex",
        "flex-col",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "h-[50px]",

        "flex",
        "flex-row",
        "items-center",
      )}
    >
      {children}
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex-auto",

        "px-[15px]",

        "text-[20px]",
        "text-[#ffffff]",
        "font-bold",
      )}
    >
      {children}
    </div>
  );
}

function Button({
  icon,
  onClick,
}: {
  icon: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={cx(
        "grid",
        "p-[10px]",

        "text-[30px]",
        "text-[#ffffff]",

        "transition-all",
        "duration-[500ms]",

        "active:bg-[#ffffff40]",
        "active:duration-0",
      )}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex",
        "flex-col",

        "p-[20px]",
        "gap-[20px]",
      )}
    >
      {children}
    </div>
  );
}
