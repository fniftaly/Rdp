drop procedure if exists merchant_rdm $$
create procedure merchant_rdm(
IN sMerchantID VARCHAR(50)
)
BEGIN
select m.mem_id as merchant_id, c.clb_id as business_id, c.folder, m.email,  
m.fname, m.lname, c.name as business_name, ca.locale, ca.token, c.org_url
from members m inner join clubs c on m.mem_id = c.mem_id
inner join clubs_authorization ca on c.clb_id = ca.clb_id
where ca.token =  sMerchantID;
END $$

/*Select* from business where token = sMerchantID;*/