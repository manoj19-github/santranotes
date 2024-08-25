"use client";
import React, { FC } from "react";
import { ChevronDownSquare, ChevronsLeftRight, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, SignUp, useUser } from "@clerk/clerk-react";
type UserItemsProps = {};
const UserItems: FC<UserItemsProps> = (): JSX.Element => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center gap-2 text-sm p-3 w-full hover:bg-primary/50"
        >
          <div className="gap-x-2 flex items-center max-w-[160px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? ""} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}&apos;s SantraNotes
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4- w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={8}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses?.[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md ng-secondary p-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? ""} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">{user?.fullName}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground flex gap-x-2">
          <LogOut className="w-4 h-4" />
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItems;
