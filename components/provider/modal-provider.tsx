"use client";

import { CreateServerModel } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModel } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModel } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModel } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

export const ModalProvider = () => {
	const [isMounted, setIsmounted] = useState(false);

	useEffect(() => {
		setIsmounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<CreateServerModel />
			<InviteModal />
			<EditServerModel />
			<MembersModal />
			<CreateChannelModel />
			<LeaveServerModal />
			<DeleteServerModal />
			<DeleteChannelModal />
			<EditChannelModel />
			<MessageFileModal />
			<DeleteMessageModal />
		</>
	);
};
