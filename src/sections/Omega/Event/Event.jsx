/* eslint-disable no-unused-vars */
import React from 'react'
import styles from "./styles/Event.module.scss"


function OmegaEventCard(title,desc) {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.cut}`}>

      </div>
    <div className={`${styles.card_img}`}>
      <img src="https://png.pngtree.com/thumb_back/fh260/background/20230530/pngtree-thai-bangkaew-dog-doggy-puppy-photo-image_2798211.jpg" alt="Event Image" />
    </div>
    <div className={`${styles.card_content}`}>
      <h2>{title}</h2>
      <p>{desc}</p>
      <button>Register Now</button>
      <div className={`${styles.cut2}`}>

      </div>
    </div>
  </div>
  )
}

function Event() {
  return (
    <>
    <div className={`${styles.eventBox}`}>

      <div className={`${styles.eventHeading}`}>
        <h1>YOUR NEXT BIG IDEA DESERVES A <br/> GRAND STAGE!</h1>
      </div>

      <div className={`${styles.eventCards}`}>
        <div className={`${styles.cardItem}`}>
          {OmegaEventCard("The FedPreneur Show", "SDGjkf dkh sdlfkadh ahf dlgfh akfhadkfj kadhfakdjhadk kahfkajdhf  akhfadkfjh kahf kadjfh  kdhfksldjh khafkladh f khdkadh f ;ahsf;alshf  kjdshfkljsdhfk klhalha lkh lkh al fhdl falf ha lahfl hdlf hl l ha ldahf dzhfdL  lhdfzdhF haof half h hafl hZ fio dfh aksfhak fakf hak fhakfah dkfh dslfkashd sg;jdg; jsg; saj ;sdgjs dlgjslg sgl sdjl sd sdh sdhsdlkfadslkg sdk s k dsk sdlk  kdg ksxjgd kdslg ")}
          {OmegaEventCard("The FedPreneur Show", "SDGjkf dkh sdlfkadh ahf dlgfh akfhadkfj kadhfakdjhadk kahfkajdhf  akhfadkfjh kahf kadjfh  kdhfksldjh khafkladh f khdkadh f ;ahsf;alshf  kjdshfkljsdhfk klhalha lkh lkh al fhdl falf ha lahfl hdlf hl l ha ldahf dzhfdL  lhdfzdhF haof half h hafl hZ fio dfh aksfhak fakf hak fhakfah dkfh dslfkashd sg;jdg; jsg; saj ;sdgjs dlgjslg sgl sdjl sd sdh sdhsdlkfadslkg sdk s k dsk sdlk  kdg ksxjgd kdslg ")}
          {OmegaEventCard("The FedPreneur Show", "SDGjkf dkh sdlfkadh ahf dlgfh akfhadkfj kadhfakdjhadk kahfkajdhf  akhfadkfjh kahf kadjfh  kdhfksldjh khafkladh f khdkadh f ;ahsf;alshf  kjdshfkljsdhfk klhalha lkh lkh al fhdl falf ha lahfl hdlf hl l ha ldahf dzhfdL  lhdfzdhF haof half h hafl hZ fio dfh aksfhak fakf hak fhakfah dkfh dslfkashd sg;jdg; jsg; saj ;sdgjs dlgjslg sgl sdjl sd sdh sdhsdlkfadslkg sdk s k dsk sdlk  kdg ksxjgd kdslg ")}
          {OmegaEventCard("The FedPreneur Show", "SDGjkf dkh sdlfkadh ahf dlgfh akfhadkfj kadhfakdjhadk kahfkajdhf  akhfadkfjh kahf kadjfh  kdhfksldjh khafkladh f khdkadh f ;ahsf;alshf  kjdshfkljsdhfk klhalha lkh lkh al fhdl falf ha lahfl hdlf hl l ha ldahf dzhfdL  lhdfzdhF haof half h hafl hZ fio dfh aksfhak fakf hak fhakfah dkfh dslfkashd sg;jdg; jsg; saj ;sdgjs dlgjslg sgl sdjl sd sdh sdhsdlkfadslkg sdk s k dsk sdlk  kdg ksxjgd kdslg ")}
        </div>
      </div>

    </div>
    </>
  )
}

export default Event
