export class user_tbl{
    user_name:string;
    user_surname:string;
    user_phone:string;
    user_team:string;
    user_email:string;
    user_password:string;
}
export class stats_tbl{
    user_id:number;
    stats_name:string;
    stats_hometeam:string;
    stats_awayteam:string;
    stats_type:string;
    stats_hometeam_fh:number;
    stats_hometeam_sh:number;
    stats_awayteam_fh:number;
    stats_awayteam_sh:number;
}