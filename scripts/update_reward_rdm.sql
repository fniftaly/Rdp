drop procedure if exists update_reward_rdm $$
create procedure update_reward_rdm(
IN sCode VARCHAR(50)
)
BEGIN
update reward set redeemed = now()
where val_code = sCode;
END $$