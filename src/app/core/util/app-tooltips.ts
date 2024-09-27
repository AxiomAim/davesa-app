export const Tooltips = {
    // General - Study
    STUDY_TITLE: 'Enter the entire study title (long name).',
    STUDY_NUMBER: 'Enter the study or protocol ID number - this is how the study will be identified in Davesa.',
    STUDY_EMAIL: 'Enter the study email',
    STUDY_SPONSOR: 'Select the Sponsor or enter a new one with the plus sign on the right.',
    VISIT_SETTINGS: 'Create visit schedule for this subject.',
    MANAGE_VISITS: 'Manage all visits for this subject.',
    CONMED_LOGS: 'View and update Conmeds log.',
    MEDICAL_HISTORY: 'View and update the subject’s medical history.',
    ADVERSE_EVENTS: 'View and update AE log',
    E_COMMUNICATION: 'View past communications with the subject and create new ones.',
    CONSENTS: 'View and upload informed consents and assents.',
    NOTE_TO_FILE: 'View and upload Note to File documents.',
    SUBJECT_SCREENING: 'Create the screening visit(s) for the subject.',
    SUBJECT_SCHEDULED: 'View and create scheduled visits. (At least one screening visit must be created before you can create scheduled visits)',
    SUBJECT_UNSCHEDULED: 'View and create unscheduled visits.',
    APPROVE_TRAINING:'PI can approve all user trainings',
    APPROVE_FORM:'PI can approve form',
    PRINT_TRAINING:'Print User Trainings',

    // Study Settings
    SS_NICK_NAME: 'Enter the study acronym (if the study has one).',
    SS_SCREENING_PERIOD: 'Max # of days screening visit can take place before the  baseline visit.',
    SS_CRO: 'Select the CRO or enter a new one with the plus sign on the right.',
    SS_SITE_NUMBER: 'Enter site number (usually found in the site activation letter).',
    SS_INDICATION: 'Enter the exact clinical indication specified in the study protocol.',
    SS_ISF_TYPE: 'Select either a Pre-populate with standard eISF folder structure or Empty eISF if you’d like to create your own folders. You can edit both.',
    SS_ISF_REPOSITORY: 'Select the ISF/TMF format - you can use standard template from clinicaltrials.gov, clone one of your own templates from previous studies, or leave create a new one.',
    SS_SCHEDULE_TYPE: 'Are study visit dates counted from the baseline or from the preceding visit?',
    SS_SITE_ACCOUNT: 'Select the site for the study.',
    SS_SUPERVISOR: 'Enter study personnel who will be approving the study, including the eSource forms. This person cannot be delegated on this study DOA.',
    SS_IRB: 'Select the IRB or enter a new one using the plus sign on the right.',
    SS_TYPE: 'Select the type of study. If the study involves administration of a treatment, select “Interventional”.',
    SS_PHASE: 'Select the clinical trial phase of the study.',
    SS_PROTOCOL_NAME: 'Usually the same as the Study Title above.',
    SS_TIMELINE: 'Estimate the duration of the study.',
    SS_PROTOCOL_NUMBER: 'Usually the same as the Study ID above.',
    SS_EXTERNAL_EDC: 'Check if the study uses an external EDC for data entry.',
    SS_FINANCE: 'Check if you will be using Davesa for budgets, invoicing and financial reporting.',
    SS_TARGET_ENROLLMENT:'Add targeted enrollment numbers.',

    // Study Details
    SD_SITE_INIT_VISIT: 'Enter the date of the Sponsor’s Site Initiation Visit.',
    SD_PROTOCOL_NAME:' Enter the protocol name.',
    SD_GLOBAL_CLONE: 'Add this eSource form to your Davesa library of Global eSource forms.',
    SD_ESOURCE_LOCK: 'eSource forms can be locked by the Study Supervisor to prevent further editing.',
    SD_TASK_ID: 'The ID assigned to each task on the DOA.',

    // eSource Form
    ES_CONTROLS: 'Controls are the types of input fields you can use to create a form. Drag a field you need into the Form Builder.',
    ES_FORM_BUILDER: 'Form Builder is where you configure your form sections and controls.',
    ES_FORM_VIEWER: 'Form Viewer previews the form you are creating in the Form Builder.',
    ES_MESSAGE_ICON: 'This is a query box that creates a message chain. You can use it to request comments, ask questions or request approval of the control.',
    ES_PARENT_CONTROL: 'To specify parent-child type dependencies, check this box if this ‘child’ control has a ‘parent’ control.',

    // Manage Tasks
    MT_TASK_ID: 'Enter task ID from the DOA.',
    MT_TASK_NAME: 'Enter task name from the DOA.',
    MT_TASK_TYPE: 'Choose whether this task is performed on-site or off-site.',
    MT_TASK_MINUTES: '(optional) Estimate the time it takes to complete the task.',
    MT_OR_CREDENTIAL: 'Add credentials, such as licenses or certificates, required for this task. – ‘Add OR Credential’, if only one of multiple credentials is required for the task.',
    MT_AND_CREDENTIAL: 'Add credentials, such as licenses or certificates, required for this task. – ‘Add AND Credential’, if at least two different credentials are both required for this task.',
    MT_TRAINING: 'Add any training required for this task. The training has to be created for the study first, before it can be added here.',
    
    // Manage Procedures
    MP_TASK: '(optional) Add DOA tasks required for this procedure. Note that some tasks may require user credentials, such as a medical license, which means this procedure will require a user to have such valid credentials to complete this procedure.',
    MP_ESOURCE: '(optional but recommended) Add one or more eSource forms, for data entry related to the completion of this procedure.',

    // Manage Visits
    MV_TYPE: 'Select visit type. If this is the first visit you are creating, only ‘Screening’ visit type will be available.',
    MV_IS_LAST_VISIT: 'Check this box if there is only one screening visit in this study.',
    MV_INTERVAL_TYPE: 'Select interval type. Are the visits spaced by days, weeks or months? For example, if some visits are spaced by days, and others by weeks, use days as default interval type.',
    MV_INTERVAL: 'Enter the interval (i.e., in the interval type selected above) from the baseline (or from previous visit, depending on how visits interval is counted in this study).',
    MV_WINDOW: 'Enter the visit window in days.',

    // Subject Visits
    SV_SCHEDULE: 'Schedule the visit, it has not been scheduled yet.',
    SV_UNCONFIRMED: 'Visit has been scheduled by the study team, but is not confirmed by the subject yet.',
    SV_CONFIRMED: 'Scheduled visit has been confirmed by the subject.',
    SV_RESCHEDULE: 'Reschedule means this visit needs to be rescheduled.',
    SV_ABSENT: 'Absent means the visit has not occurred on time, and the study staff needs to either reschedule or mark the visit as missed.',
    SV_MISSED: 'Missed visit was designated by study team as ‘missed’.',
    SV_CLINIC: 'Clinic visit means this visit has started but has not been completed yet.',
    SV_REVIEW: 'Review visit means The visit is over and is in review.',
    SV_FINISHED: 'Finished means visit has finished, but has not been reviewed and approved by the PI.',
    SV_VALIDATED: 'Finished visit was reviewed by Sub-I ',
    SV_ENDORSED: 'Endorsed means the PI has signed off the visit.',
    SV_MONITOR: 'Visit is verified by Monitor',

    // Consent Tab
    CT_ADD_CONSENT: 'Upload a new signed consent and note the study protocol version and the date consent was signed by the subject.',

    // Finance Budget
    FB_DISCOUNT_DAYS: 'If you offer a discount for early payments, specify the number of days the payor has to make the early payment and earn the discount. If not applicable, enter “0”.',
    FB_DISCOUNT_PERCENTAGE: 'You can specify the discount percentage for early payments on each invoice. If not applicable, enter “0”.',
    FB_PENALTY_PERCENTAGE: 'There may be a late payment penalty for invoices that are past due. If applicable, please enter the percentage to be applied to the amount due when the payment is late. If not, enter “0”.',
    FB_DAYS_UNTIL_LATE: 'The payor has [X] days after the invoice date to send payment.',
    FB_LABOR_RATES: 'You can keep track of the labor rates for your staff here. This will be used mainly for budgeting and financial projections.',
    FB_SETTINGS: 'View your study specific payment terms and budget settings here.',
    FB_PROCEDURES: 'View your visit/ procedure budget here.',
    FB_OTHER: 'View your passthrough budget here.',
    FB_PAYEE_DETAILS: 'View your payee bank details as they need to appear on the invoices for this specific study.',
    FB_PURCHASE_ORDER: 'Check if the sponsor/ payor requires a Purchase Order. Most payors require a PO number on invoices.',
    
};
