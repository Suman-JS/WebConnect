"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ActionTooltipProp {
	label: string;
	children: React.ReactNode;
	side?: "top" | "left" | "bottom" | "right";
	align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
	label,
	children,
	side,
	align,
}: ActionTooltipProp) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}>
					<p className=" font-semibold text-sm capitalize">
						{label.toLowerCase()}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
