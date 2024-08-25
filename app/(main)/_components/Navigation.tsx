"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, {
  ElementRef,
  FC,
  Fragment,
  useRef,
  useState,
  MouseEvent,
  useEffect,
} from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItems from "./UserItems";
type NavigationProps = {};
const Navigation: FC<NavigationProps> = (): JSX.Element => {
  const pathname = usePathname();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const isResizingRef = useRef<boolean>(false);

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobileView);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const handleMouseMove = (event: any) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const handleMouseUp = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobileView ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "left",
        isMobileView ? "100%" : "240px"
      );
      navbarRef.current.style.setProperty(
        "width",
        isMobileView ? "0" : "calc(100% - 240px)"
      );
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };
  const collapseWidth = () => {
    if (sidebarRef?.current && navbarRef?.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };
  useEffect(() => {
    if (isMobileView) {
      collapseWidth();
    } else {
      resetWidth();
    }
  }, [isMobileView]);
  useEffect(() => {
    if (isMobileView) {
      collapseWidth();
    }
  }, [isMobileView, pathname]);
  return (
    <Fragment>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full min-h-screen bg-secondary overflow-y-auto fixed md:relative flex w-60  flex-col z-[99999]    ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobileView && "w-0"
        )}
      >
        <div
          onClick={collapseWidth}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-10 md:right-2  opacity-0  group-hover/sidebar:opacity-100 transition-all ",
            isMobileView && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItems />
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100  transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[999999] w-[calc(100%-240px)] ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobileView && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed ? (
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground"
              role="button"
            />
          ) : (
            <></>
          )}
        </nav>
      </div>
    </Fragment>
  );
};

export default Navigation;
