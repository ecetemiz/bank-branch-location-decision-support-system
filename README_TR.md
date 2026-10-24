# Banka Şubesi Lokasyon Seçimi – Karar Destek Sistemi

**KDS dersi akademik proje çalışması**  
**Ece Temiz – Gazi Üniversitesi, Yönetim Bilişim Sistemleri**

## Proje özeti

Bu çalışmada, Ankara'da yeni bir banka şubesinin konumlandırılması için **6 ilçe** ve **5 kriter** değerlendirilmiştir. Banka yönetiminin kararını sistematik olarak desteklemek için ağırlıklı toplam MCDM, AHP ve TOPSIS yöntemleri kullanılmış; farklı ağırlık ve piyasa koşullarını gösteren senaryo/duyarlılık analizleri sunulmuştur.

**İlçeler:** Çankaya, Yenimahalle, Keçiören, Sincan, Mamak ve Etimesgut.  
**Kriterler:** Nüfus (fayda), kira göstergesi (maliyet), ticari hareketlilik (fayda), mevcut şube sayısı (maliyet/rekabet), ulaşım kolaylığı (fayda).

### Çalışmanın bileşenleri

- Karar probleminin ve alternatiflerin tanımlanması
- Ham karar matrisinin hazırlanması
- Fayda/maliyet yönlü normalizasyon
- Ağırlıklı toplam MCDM analizi
- AHP ikili karşılaştırma matrisi ve kriter ağırlıkları
- TOPSIS ideal çözüme yakınlık analizi
- Senaryo, duyarlılık ve yönetici önerisi

**Sunumdaki temel öneri:** Keçiören. Bu, sunumda kullanılan eğitim amaçlı veriler ve ağırlıklarla hesaplanan bir vaka çalışması sonucudur.

## Nasıl açılır?

- `index.html` dosyasını çift tıklayarak interaktif web demosunu aç.
- Ön tanımlı senaryo butonlarından birine bas veya kriterlerin kaydırıcılarını değiştir.
- Yeniden üretilen MCDM, TOPSIS ve sabit AHP sonuçlarını karşılaştır.
- Python yüklüyse depo klasöründe `python analysis/verify.py` komutunu çalıştırabilirsin.
- Gerçek sınıf sunumu için `presentations/` klasörünü incele.

## Önemli açıklama

Web demosu ve Python doğrulama kodu, **ders sunumundan sonra portfolyo amacıyla eklenmiş** örnek uygulamadır. Orijinal ders tesliminde geliştirilmiş bir web uygulaması olduğu anlamına gelmez.

Sunumların bazı skorları farklı sürümlerde tutarsızdır. Örneğin TOPSIS için **0,612 / 0,812**, AHP için **7,05 / 7,14** değerleri yer alır. Bu depodaki kod, açıkça tanımlanmış verileri ve hesaplama yöntemini uygulayarak Keçiören için yaklaşık MCDM **6,98**, AHP **7,14** ve TOPSIS **0,812** bulur. AHP matrisinden yeniden hesaplanan tutarlılık oranı yaklaşık **%1,02**'dir. Detaylar `docs/methodology.md` dosyasındadır.

Verilerin resmî kaynaklardan güncel ve doğrulanmış olduğuna ilişkin bu depoda kanıt bulunmamaktadır. Kira birimi kaynak slaytta belirsiz olduğundan **kira göstergesi** olarak paylaşılmıştır. Çalışma gerçek banka lokasyonu yatırım tavsiyesi değildir.
