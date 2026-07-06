import React from 'react';

function Contact() {
    return (
        <>
            <section className="contact" aria-labelledby="contact-heading">
                <h1 id="contact-heading">Visit Us</h1>
                <address>
                    <p>
                        📍 Near PG Degree College, Anu Market, Hamirpur (Anu), Himachal Pradesh<br />
                        ⭐ Rated 4.5★ (1,250+ reviews)
                    </p>
                </address>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.6498086260543!2d76.51992589999999!3d31.699522208486563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904d443ecf19601%3A0xffb6a63e8aae8b2f!2sPanditan%20Di%20Hatti!5e0!3m2!1sen!2sin!4v1764696376808!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    title="Panditan Di Hatti location on Google Maps"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
        </>
    );
}

export default Contact;
