import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Newsletter.css";

export default function Newsletter() {
  return (
    <div className="newsletter-section">
      <section className="newsletter-tips" id="how_to_buy">
        <div className="container">
          <h2 className="newsletter-tips__title site_font">
            How to Spot a Good Realtor?
          </h2>
          <p className="newsletter-tips__subtitle site_font">
            Tips on selecting a reliable realtor that will help you buy or sell a
            home.
          </p>

          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="newsletter-swiper"
          >
            <SwiperSlide>
              <div className="slider_card hw_slie d-block h-100">
                <h6>1. Experience</h6>
                <p>
                  The proof is in the transactions. Handling multimillion-dollar
                  sales can involve very complicated aspects, both on the
                  listing and selling sides. When you hire your realtor, review
                  properties they have sold to gauge their competence.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider_card hw_slie d-block h-100">
                <h6>2. Negotiation Skills</h6>
                <p>
                  When hiring an expert negotiator, review testimonials, online
                  reviews, and feedback from prospective realtors. Strong
                  representation and positive client feedback demonstrate
                  negotiation prowess.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider_card hw_slie d-block h-100">
                <h6>3. Transparency</h6>
                <p>
                  A trustworthy agent understands your concerns and recognizes
                  your need for reassurance. You should feel comfortable
                  requesting references to gain further insight into their
                  background.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider_card hw_slie d-block h-100">
                <h6>4. Global Recognition</h6>
                <p>
                  International firms such as Global Real Estate Marketplace Realty International
                  recruit experienced, successful agents. Renowned brands signal
                  superior service and expertise.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider_card hw_slie d-block h-100">
                <h6>5. Market Knowledge</h6>
                <p>
                  A successful broker should possess deep market understanding,
                  discuss industry developments, identify trends, and provide
                  insights not readily available online.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider_card hw_slie d-block h-100">
                <h6>6. Community & Affiliations</h6>
                <p>
                  Skilled agents stay engaged in local communities and national
                  organizations. Many deals happen off-market — you need an agent
                  who hears opportunities first.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="newsletter-subscribe eco_native">
        <div className="container">
          <div className="newsletter-subscribe__inner">
            <p className="newsletter-subscribe__title">
              Subscribe for our latest news and updates
            </p>
            <form
              className="newsletter-subscribe__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                className="letter_news"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button type="submit" className="subs_btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
