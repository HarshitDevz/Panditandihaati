import React from 'react';

function About() {
    return (
        <>
            <section className="about" aria-labelledby="about-heading">
                <h1 id="about-heading" style={{fontFamily: "'Playfair Display', serif", color: 'var(--accent-dark)', fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.05, margin: 0}}>Our Story</h1>
                <p>
                    Since 1980, Panditan Di Hatti has been a beloved name in Hamirpur (Anu), Himachal Pradesh.
                    Founded with love and tradition, our shop has served generations with authentic sweets and snacks.
                    With over <strong>1,250+ reviews</strong> averaging <strong>4.5★</strong>, we continue to be a trusted destination
                    for locals and visitors alike.
                </p>
                <img src="images/2owner.png" loading="lazy" alt="Owner of Panditan Di Hatti sweet shop" width={400} height={400} className="w-full max-w-sm mx-auto rounded-xl mt-4" />

                <br /><br />

                <h2>Our Shop</h2>
                <p>
                    Panditaan Di Hatti is a popular sweet shop located in Hamirpur, Himachal Pradesh, known for its traditional
                    Himachali sweets, particularly the besan ki barfi. The shop is situated near the Govt Degree College and is
                    well-regarded for its fresh and flavorful treats. Visitors often praise the excellent service and the quality of
                    the sweets, making it a must-visit for those looking to indulge in authentic sweets.
                </p>
                <img src="images/shop.png" loading="lazy" alt="Panditan Di Hatti shop front in Hamirpur" width={1000} height={600} className="shop-img w-full max-w-full" />
            </section>
        </>
    );
}

export default About;
