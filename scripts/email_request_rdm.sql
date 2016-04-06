drop procedure if exists email_request_rdm $$
create procedure email_request_rdm(
IN iBusinessId INT
)
BEGIN
select v.sent_to_mem_id, v.reward_type as rwdtype,v.sent_to_email as customer_email,v.sent_to_phone as customer_phone,
v.redeemed,v.expire_date as expdate, m.fname, m.lname, v.val_code, p.birth_month, p.birth_day
from vip_reward_emails_log v inner join members m on v.sent_to_mem_id = m.mem_id
inner join profiles p on m.mem_id = p.mem_id
where v.reward_clb_id = iBusinessId and m.source = 'wix'
and (m.email not like '%your%' and m.email not like '%DELETED%' and m.email not like 'sd4057%') 
order by expdate, customer_email;
END $$

-- select v.sent_to_email as customer_email,v.sent_to_phone as customer_phone, 
-- v.redeemed, m.fname, m.lname, v.val_code, p.birth_month, p.birth_day, 
-- from vip_reward_emails_log v inner join members m on v.sent_to_mem_id = m.mem_id
-- where v.reward_clb_id = iBusinessId and m.source = 'wix'
-- and (m.email not like '%your%' and m.email not like '%DELETED%' and m.email not like 'sd4057%')  
-- and v.expire_date > now() order by v.val_code;

--- 4/4/16
-- select v.sent_to_mem_id, v.sent_to_email as customer_email,v.sent_to_phone as customer_phone,
-- v.redeemed, m.fname, m.lname, v.val_code, p.birth_month, p.birth_day
-- from vip_reward_emails_log v inner join members m on v.sent_to_mem_id = m.mem_id
-- inner join profiles p on m.mem_id = p.mem_id
-- where v.reward_clb_id = 122900 and m.source = 'wix'
-- and (m.email not like '%your%' and m.email not like '%DELETED%' and m.email not like 'sd4057%') 
-- order by customer_email;


