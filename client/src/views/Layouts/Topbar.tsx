import "@sass/layouts/topbar.scss"
import NotificationIcon from "@Icons/Notification"
import SecondarySidebarIcon from "@Icons/SecondarySidebar"
import { JSXElementConstructor, ReactNode, useEffect, useState } from "react"
import { FlowIcon } from "../Components/Icons/DisplayIcon";
import { useDisplay } from "@/context/DisplayContext";
import { useNotification } from "@/context/NotificationContext";
import { Trash } from "../Components/Icons/IconSidebar";

interface TopbarProps {
  stateLeft: boolean;
  stateRight: boolean;
  setStateRight: (stateRight: boolean) => void;
}

export default function Topbar({ stateLeft, stateRight, setStateRight }: TopbarProps) {
  const { displayState, toggleDisplay } = useDisplay()

  const [openNotification, setOpenNotification] = useState<boolean>(false)

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      const getTime = new Date();

      // Extract hours, minutes, seconds
      const hours = String(getTime.getHours()).padStart(2, '0');
      const minutes = String(getTime.getMinutes()).padStart(2, '0');
      const seconds = String(getTime.getSeconds()).padStart(2, '0');

      const currentTime = `${hours}:${minutes}:${seconds}`;
      setTime(currentTime);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="topbar-title" className={(stateLeft ? "active" : "")}>
        <div className="header-title">
          <h1>Billet Line</h1>
        </div>
      </div>

      <div id="display-setting" className={(stateLeft ? "active" : "")}>
        <div className="flex flex-col gap-3">
          <DisplaySettingItem
            state={displayState}
            icon={FlowIcon}
            onClick={(e) => {
              e.preventDefault()
              toggleDisplay()
            }}
          >Flow</DisplaySettingItem>

          {/* <DisplaySettingItem
            icon={FurnaceIcon}
            onClick={(e) => {
              e.preventDefault()
              setStateRight(!stateRight)
            }}
          >Label</DisplaySettingItem>

          <DisplaySettingItem
            icon={FurnaceIcon}
            onClick={(e) => {
              e.preventDefault()
              setStateRight(!stateRight)
            }}
          >Tooltip</DisplaySettingItem> */}
        </div>
      </div>

      <div id="topbar-features">
        <div className="attribute-wrapper">
          {time &&
            <div className="hidden sm:inline">
              <span>{time} WIB</span>
            </div>
          }

          <button type="button"
            className={"icon-topbar " + (openNotification ? "text-blue-500" : "")}
            onClick={() => setOpenNotification(!openNotification)}>
            <NotificationIcon />
          </button>

          <button type="button"
            className={"icon-topbar " + (stateRight ? "text-blue-500" : "")}
            onClick={() => setStateRight(!stateRight)}>
            <SecondarySidebarIcon active={stateRight ? true : false} />
          </button>
        </div>

        {openNotification && (
          <NotificationContainer />
        )}
      </div>
    </>
  );
}

type DisplaySettingItemProps = {
  icon: JSXElementConstructor<IconProps>;
  state: boolean;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function DisplaySettingItem({ icon: Icon, state, children, onClick }: DisplaySettingItemProps) {

  return (
    <div>
      <button
        type="button"
        className={"item-wrapper default" + " " + (state ? "active" : "")}
        onClick={onClick}
      >
        <Icon className="w-6 h-6" />
        <div className="separator"></div>
        <span className="text-sm font-semibold text-left item-name">{children}</span>
      </button>
    </div>
  )
}

function NotificationContainer() {
  const { notifications, clearNotifications } = useNotification()

  return (
    <div className="absolute right-0 top-10">
      <div className="flex flex-col overflow-hidden border w-72 max-w-[100vw] rounded-xl border-slate-200 bg-white drop-shadow-lg">
        <div className="flex flex-col overflow-y-auto max-h-[calc(24rem-4px)]">
          {notifications && notifications.map((notif, idx) => {
            return (
              <NotificationItem
                key={idx}
                color={idx % 2 === 0 ? "bg-slate-100" : "bg-white"}
                message={notif.message}
                datetime={notif.datetime}
              />
            )
          })}
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center justify-center transition-colors bg-slate-200 hover:bg-slate-300 border-t border-slate-300">
            <button type="button" className="flex justify-center items-center gap-2 w-full h-full p-2 text-sm font-medium" onClick={() => clearNotifications()}>
              <Trash className="w-5" />
              <span>Hapus semua</span>
            </button>
          </div>
        )}

        {notifications.length === 0 && (
          <div>
            <div className="flex items-center justify-center p-4">
              <span className="text-sm font-medium text-gray-400">Tidak ada notifikasi</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NotificationItem({ message, datetime, color }: { message: string, datetime: number, color: string }) {
  const dateTimeObject = new Date(datetime);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now.getTime() - dateTimeObject.getTime();

  // Format the date
  const date = dateTimeObject.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  // Format the time
  let time = '';

  // Display "baru saja" for notifications within one minute
  if (timeDifference < 60000) {
    time = 'Baru saja';
  } else if (timeDifference < 3600000) {  // Display "x menit yang lalu" for notifications within one hour
    const minutesAgo = Math.floor(timeDifference / 60000);
    time = `${minutesAgo} menit yang lalu`;
  } else {
    // Display the regular time format for notifications older than one hour
    time = dateTimeObject.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <div className={"px-3 py-4 flex flex-col gap-2" + " " + color}>
      <h6 className="text-sm font-semibold">{message}</h6>
      <span className="text-xs text-gray-400">{
        timeDifference < 3600000 ? time : `${date} | ${time}`
      }</span>
    </div>
  );
}
