module.exports = function () {
    return {
        categories: [
            { id: 1, name="Kedi" },
            { id: 2, name="Köpek" },
            { id: 3, name="Kuş" },
            { id: 4, name="Kemirgen" },
            { id: 5, name="Sürüngen" },
            { id: 6, name="Akvaryum" }
        ],

        paws: [
            { id: 1, category="Kedi", name="Moshi", imageUrl: '1.jpg', city: "İzmir", title="Moshi'ye yuva arıyoruz.", description="İzmirdeki bu üç yaşında oğlumuz..." },
            { id: 2, category="Kedi", name="4 OYUNCU YAVRUMUZA YUVA ARIYORUZ!", imageUrl: '2.jpg', city: "Sakarya", title="4 OYUNCU YAVRUMUZA YUVA ARIYORUZ!", description="15 Mayıs doğumlu anneleriyle birlikte balkonumuzda baktığımız 4 oyuncu yavrumuza ömürlük yuva arıyoruz. Balkonda büyüdüler, kum eğitimleri var, doğdukları günden beri takip ediyorum tamamen sağlıklı ve oyuncular. Balkondan düşme riskleri olduğu için şimdilik bahçemizde duruyorlar ancak güvenli bir yuvaları olmazsa diğer kedilerin zarar vermesinden korkuyoruz. Sokak ortamına karışıp zarar görmeden onlar için şimdiden sıcak bir yuva garantilemek istiyoruz. Sahiplenecek kişinin yavruları alır almaz iç dış parazitlerini ve zamanı gelince diğer aşılarını yaptırmaları ,takip en önemli şartımızdır." },
            { id: 3, category="Köpek", name="Duman", city: "İzmir", title="Kemer çevre yolunun ortasından, az daha araba çarpacakken kurtarıldı", }
        ]
    }
}