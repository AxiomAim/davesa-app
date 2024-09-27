import { eSourceForm } from "./esource-form.interface";
import { StudyProcedure } from "./study-procedure.interface";
import { Study } from "./study.interface";
import { Subject } from "./subject.interface";

export interface Queries{
    oid: string;    
    type: string;
    study_procedure_id: number | null;
    study_id: number | null;
    chat_threads: ChatThreads[];
    subject: Subject;
    esource_form: eSourceForm;
    study:Study;
    study_schedule_visit_id: number | null;
    study_schedule_visit:{
        name: string;
    };
    study_procedure : StudyProcedure | null;
    thread_name: string;
    created_by: string;
    query_status: string | null;
    study_number: string;
    esource_form_name: string;
}

interface ChatThreads {
    id: number;
    oid: string;
    name: string;
    status: string;
    field_id: string;
    section_id: string;
    user:{
        first_name: string;
        last_name: string;
    }
}