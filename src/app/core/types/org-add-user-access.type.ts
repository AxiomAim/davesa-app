export type OrgHasAddUserAccess = {
    addUserAccess: boolean;
    seats?: number;
    paymentOid?: string;
}

export const UPGRADE_PLAN_MESSAGE =
    `You currently have the maximum number of seats allowed for your plan.<br>Please upgrade your plan to add more users.`;