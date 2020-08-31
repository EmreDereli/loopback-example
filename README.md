# emredereli

API Dökümasyonu => https://localhost:3000/explorer

## DEPARTMAN

**GET /department**
Tüm departmanların dizisini döndürür.

**GET /department/id**
Gönderilen Id'ye sahip olan departmanı döndürür

**POST /department**
Yeni departman ekler.

**PUT /department/id**
Gönderilen Id'ye sahip olan departmanı günceller.

**GET /departments/id/employees**
Departmanda çalışan tüm çalışanların listesini döndürür.

**GET /departments/id/salary**
İlgili departmanın maaş ortalamasını döndürür.

**GET /departments/id/titles**
İlgili departmandaki ünvanların listesini döndürür.

## ÇALIŞAN

**GET /employees/count**
Çalışan sayısını döndürür.

**GET /employees/id**
Gönderilen Id'ye sahip olan çalışanı döndürür

**POST /employees**
Yeni çalışan ekler.

**PUT /employees/id**
Gönderilen Id'ye sahip olan çalışanın bilgilerini günceller.

**DELETE /employees/id**
İlgili çalışanı veritabanından siler.

**GET /employees**
Tüm çalışanların listesini döndürür.

## YÖNETİCİ

**GET /managers/id/employees**
İlgili yöneticilerin çalışanlarını işe giriş tarihine göre sıralı şekilde listesini döndürür.

**GET /managers/count**
Yönetici sayısını döndürür.

**PUT /managers/id**
İlgili yöneticinin bilgilerini günceller.

**GET /managers/id**
İlgili yöneticiyi döndürür.

**DELETE /managers/id**
İlgili yöneticiyi veritabanından siler.

**POST /managers**
Yeni yönetici ekler.

**GET /managers**
Tüm yöneticilerin listesini döndürür.

## OFİS

**GET /offices/count**
Ofis sayısını döndürür.

**PUT /managers/id**
İlgili ofisin bilgilerini günceller.

**GET /managers/id**
İlgili ofisi döndürür.

**DELETE /managers/id**
İlgili ofisi veritabanından siler.

**POST /managers**
Yeni ofis ekler.

**GET /managers**
Tüm ofislerin listesini döndürür.

## UNVAN

**GET /titles/id/employees**
İlgili unvana sahip çalışanları listeler.

**GET /titles/count**
Unvan sayısını döndürür.

**PUT /titles/id**
İlgili unvanın bilgilerini günceller.

**GET /titles/id**
İlgili unvanı döndürür.

**DELETE /titles/id**
İlgili unvanı veritabanından siler.

**POST /titles**
Yeni unvan ekler.

**GET /titles**
Tüm unvanların listesini döndürür.



[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
