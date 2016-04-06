./composer.phar install generate autoloader namespace

server:katty99cloud
/*http://dev.riiwards.com/rd/?/e089ce34e789144bf805108eeb35a219*/
/*Test file daldan bassan*/
prod DB
Un: nualertsprd
Pwd full*moon
DB nualerts_prd

define("SQL_HOST","localhost");
define("SQL_DB","riiwards_dev");
define("SQL_USER","riiwards_dev");
define("SQL_PASS","full*moon");

drop procedure if exists merchant_rdm $$
create procedure merchant_rdm(
IN sMerchantID VARCHAR(50)
)
BEGIN
Select* from business where token = sMerchantID;

END $$

#==============================================#

drop procedure if exists coupon_rdm $$
create procedure coupon_rdm(
IN iBusinessID INT,
IN sCode VARCHAR(12)
)
BEGIN

SELECT c.fname, c.lname, c.birth_month, c.birth_day, r.reward_type, r.reward_text, 
r.visit_count, r.val_code, r.expire_date, r.redeemed, t.description
FROM customer c, reward r, reward_type t
WHERE c.customer_id = r.customer_id and t.reward_type = r.reward_type
AND r.business_id = iBusinessID
AND r.val_code = sCode;

END $$
+++++++++++++++++++++DEMO VESION++++++++++++++++++++++++
drop procedure if exists coupon_rdm_demo $$
create procedure coupon_rdm_demo(
IN iBusinessID INT,
IN sCode VARCHAR(12),
IN sEmail VARCHAR(25)
)
BEGIN
DECLARE rwId INT DEFAULT 0;
SELECT id into rwId FROM `reward` WHERE `redeemed` like concat('%', curdate(),'%') and business_id =iBusinessID and customer_email=sEmail;
IF rwId = ''
THEN
SELECT c.fname, c.lname, c.birth_month, c.birth_day, r.reward_type, r.reward_text, 
r.visit_count, r.val_code, r.expire_date, r.redeemed
FROM customer c, reward r
WHERE c.customer_id = r.customer_id and r.redeemed is null
AND r.business_id = iBusinessID
AND r.val_code = sCode and r.customer_email=sEmail;
ELSE
Select rwId;
END IF;
END $$
======================redeemReward======================

drop procedure if exists update_reward_rdm $$
create procedure update_reward_rdm(
IN sCode VARCHAR(50)
)
BEGIN
update reward set redeemed = now()
where val_code = sCode;

END $$
================================================
drop procedure if exists process_reward_rdm $$
create procedure process_reward_rdm(
BEGIN
update reward set redeemed = null, expire_date=null where business_id=123223;
Select val_code from reward where business_id=123223;
END $$
=============================
/*ERROR HANDLING*/
ini_set('error_reporting', E_ALL);
error_reporting(E_ALL);
ini_set('log_errors',TRUE);
ini_set('html_errors',FALSE);
ini_set('error_log','/home/htdocs/webXX/html/error_log.txt');
ini_set('display_errors',FALSE);

++++++++++++++++++++++++++++++++++++++++++email request+++++++++++++++++
drop procedure if exists email_request_rdm $$
create procedure email_request_rdm(
IN iBusinessId INT
)
BEGIN
select cb.customer_email, cb.fname, cb.lname,cb.customer_phone, rw.val_code from customer_business cb 
inner join reward rw  on cb.customer_id = rw.customer_id and cb.business_id = rw.business_id
where cb.business_id = iBusinessId and rw.expire_date > now() and rw.redeemed is null order by rw.val_code;
END $$
===========================
drop procedure if exists last_coupon_rdm $$
create procedure last_coupon_rdm(
IN iBusinessID INT,
IN sCode VARCHAR(12)
)
BEGIN
DECLARE clnId INT DEFAULT 0;
DECLARE rwId INT DEFAULT 0;

SELECT `customer_id` into clnId FROM `reward` WHERE `val_code` = sCode;

SELECT id into rwId FROM `reward` WHERE `redeemed` like concat('%', curdate(),'%') and business_id =iBusinessID

and customer_id=clnId;

Select rwId;

END $$




test text for rdp production just junk for junk

