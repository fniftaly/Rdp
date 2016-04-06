
drop procedure if exists coupon_rdm $$
create procedure coupon_rdm(
IN iBusinessID INT,
IN sCode VARCHAR(12)
)
BEGIN

SELECT m.fname, m.lname, p.birth_month, p.birth_day, r.reward_type, r.reward_text, r.visit_count, r.val_code, r.expire_date, r.redeemed, t.description
FROM members m, profiles p, vip_reward_emails_log r, reward_type t
WHERE m.mem_id = r.sent_to_mem_id
AND m.mem_id = p.mem_id
AND r.reward_type LIKE concat( t.reward_type, '%' )
AND r.reward_clb_id =iBusinessID
AND r.val_code = sCode;
END $$

-- SELECT c.fname, c.lname, c.birth_month, c.birth_day, r.reward_type, r.reward_text, 
-- r.visit_count, r.val_code, r.expire_date, r.redeemed, t.description
-- FROM customer c, reward r, reward_type t
-- WHERE c.customer_id = r.customer_id and t.reward_type = r.reward_type
-- AND r.business_id = iBusinessID
-- AND r.val_code = sCode;

-- SELECT m.fname, m.lname, p.birth_month, p.birth_day, r.reward_type, r.reward_text, r.visit_count, r.val_code, r.expire_date, r.redeemed, t.description
-- FROM members m, profiles p, vip_reward_emails_log r, reward_type t
-- WHERE m.mem_id = r.sent_to_mem_id
-- AND m.mem_id = p.mem_id
-- AND r.reward_type LIKE concat( t.reward_type, '%' )
-- AND r.reward_clb_id =122900
-- AND r.val_code = '9914-2569'