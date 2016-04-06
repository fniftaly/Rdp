drop procedure if exists last_coupon_rdm $$
create procedure last_coupon_rdm(
IN iBusinessID INT,
IN sCode VARCHAR(12)
)
BEGIN
DECLARE clnId INT DEFAULT 0;
DECLARE rwId INT DEFAULT 0;
select `sent_to_mem_id` into clnId  from `vip_reward_emails_log` where `val_code`  = sCode;
SELECT id into rwId FROM `vip_reward_emails_log` WHERE `redeemed` like concat('%', curdate(),'%') and reward_clb_id = iBusinessID
and sent_to_mem_id=clnId;
Select rwId;
END $$
