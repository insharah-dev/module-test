import { createClient } from "@supabase/supabase-js";

const projectUrl = 'https://naarwdfnnqcvqmzpyjtf.supabase.co'
const projectKey = 'sb_publishable_YPsoAtLDrJeRuozXJ2OrzA_aqD8JjSD'

export const client = createClient(projectUrl, projectKey)
console.log(client, createClient);
