import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerHeader } from "@/components/server/server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "@/components/server/server-search";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "@/components/server/server-section";
import { ServerChannel } from "@/components/server/server-channel";
import { ServerMember } from "@/components/server/server-member";

interface ServerSidebarProps {
	serverId: string;
}

const iconMap = {
	[ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
	[ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
	[ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
	[MemberRole.GUEST]: null,
	[MemberRole.MODERATOR]: (
		<ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
	),
	[MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
	const profile = await currentProfile();

	if (!profile) return redirect("/");

	const server = await db.server.findUnique({
		where: {
			id: serverId,
		},
		include: {
			channels: {
				orderBy: {
					createdAt: "asc",
				},
			},
			members: {
				include: {
					profile: true,
				},
				orderBy: {
					role: "asc",
				},
			},
		},
	});

	if (!server) return redirect("/");

	const textChannels = server?.channels.filter(
		(channel) => channel.type === ChannelType.TEXT
	);

	const audioChannels = server?.channels.filter(
		(channel) => channel.type === ChannelType.AUDIO
	);

	const videoChannels = server?.channels.filter(
		(channel) => channel.type === ChannelType.VIDEO
	);

	const members = server?.members.filter(
		(member) => member.profileId !== profile.id
	);

	const role = server.members.find(
		(member) => member.profileId === profile.id
	)?.role;

	return (
		<div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
			<ServerHeader
				server={server}
				role={role}
			/>
			<ScrollArea className=" flex-1 px-3">
				<div className=" mt-2 ">
					<ServerSearch
						data={[
							{
								label: "Text Channel",
								type: "channel",
								data: textChannels?.map((channel) => ({
									id: channel.id,
									name: channel.name,
									icon: iconMap[channel.type],
								})),
							},
							{
								label: "Voice Channel",
								type: "channel",
								data: audioChannels?.map((channel) => ({
									id: channel.id,
									name: channel.name,
									icon: iconMap[channel.type],
								})),
							},
							{
								label: "Video Channel",
								type: "channel",
								data: videoChannels?.map((channel) => ({
									id: channel.id,
									name: channel.name,
									icon: iconMap[channel.type],
								})),
							},
							{
								label: "Members",
								type: "member",
								data: members?.map((member) => ({
									id: member.id,
									name: member.profile.name,
									icon: roleIconMap[member.role],
								})),
							},
						]}
					/>
				</div>
				<Separator className=" bg-zinc-200 dark:bg-zinc-700 my-2 rounded-md" />
				{!!textChannels?.length && (
					<div className="mb-2">
						<ServerSection
							label="Text Channels"
							role={role}
							sectionType="channels"
							channelType={ChannelType.TEXT}
						/>
						<div className=" space-y-[2px]">
							{textChannels.map((channel) => (
								<ServerChannel
									key={channel.id}
									channel={channel}
									role={role}
									server={server}
								/>
							))}
						</div>
					</div>
				)}
				{!!audioChannels?.length && (
					<div className="mb-2">
						<ServerSection
							label="Voice Channels"
							role={role}
							sectionType="channels"
							channelType={ChannelType.AUDIO}
						/>
						<div className=" space-y-[2px]">
							{audioChannels.map((channel) => (
								<ServerChannel
									key={channel.id}
									channel={channel}
									role={role}
									server={server}
								/>
							))}
						</div>
					</div>
				)}
				{!!videoChannels?.length && (
					<div className="mb-2">
						<ServerSection
							label="Video Channels"
							role={role}
							sectionType="channels"
							channelType={ChannelType.VIDEO}
						/>
						<div className=" space-y-[2px]">
							{videoChannels.map((channel) => (
								<ServerChannel
									key={channel.id}
									channel={channel}
									role={role}
									server={server}
								/>
							))}
						</div>
					</div>
				)}
				{!!members?.length && (
					<div className="mb-2">
						<ServerSection
							label="Members"
							role={role}
							sectionType="members"
							server={server}
						/>
						<div className=" space-y-[2px]">
							{members.map((member) => (
								<ServerMember
									key={member.id}
									member={member}
									server={server}
								/>
							))}
						</div>
					</div>
				)}
			</ScrollArea>
		</div>
	);
};
