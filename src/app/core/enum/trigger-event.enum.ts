export enum TriggerEventEnum {
  MONTHLY = 'Monthly',
  ANNUALLY = 'Annually',
  PER_OCCURANCE = 'Per Occurance',
  CLINICAL_TRIAL_APPLICATION = 'Clinical Trial Application',
  SITE_INITIATION_VISIT = 'Site Initiation Visit',
  NEW_PROTOCOL = 'New Protocol',
  UPDATE_PROTOCOL = 'Update Protocol',
  ACTIVATE_STUDY = 'Activate Study',
  SUSPEND_STUDY = 'Suspend Study',
  CLOSE_STUDY = 'Close Study',
  CTA_SIGNED = 'CTA Signed',
  BASELINE_VISIT = 'Baseline Visit',
  INVOICESENT_VISIT = 'Invoice Sent',
  TERMINATE_STUDY = 'Terminate Study',
}

export enum FinanceTriggerEventTypeEnum {
  Fixed = 'fixed',
  SUBJECT_STIPEND = 'subject_stipend',
  SUBJECT_TRAVEL = 'subject_travel',
  VARIABLE = 'variable',
}
