import { useEffect, useState } from "react";

export function usePageState() {
  const { isEditing: _isEditing, isShowSettings: _isShowSettings } = history.state ?? {};

  const [isEditing, setIsEditing] = useState<boolean>(_isEditing);
  const [isShowSettings, setIsShowSettings] = useState<boolean>(_isShowSettings);

  useEffect(() => {
    window.addEventListener("popstate", onPopHistory);
    return () => window.removeEventListener("popstate", onPopHistory);
  }, []);

  function onPopHistory() {
    const { isEditing: _isEditing, isShowSettings: _isShowSettings } = history.state ?? {};

    setIsEditing(_isEditing);
    setIsShowSettings(_isShowSettings);
  }

  function startEditing() {
    setIsEditing(true);
    history.pushState({ isEditing: true, isShowSettings }, "");
  }

  function stopEditing() {
    setIsEditing(false);
    history.pushState({ isEditing: false, isShowSettings }, "");
  }

  function openSettings() {
    setIsShowSettings(true);
    history.pushState({ isEditing, isShowSettings: true }, "");
  }

  function closeSettings() {
    setIsShowSettings(false);
    history.pushState({ isEditing, isShowSettings: false }, "");
  }

  return {
    isEditing,
    startEditing,
    stopEditing,

    isShowSettings,
    openSettings,
    closeSettings,
  };
}
