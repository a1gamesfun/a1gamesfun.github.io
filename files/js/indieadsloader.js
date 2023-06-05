


function spawnAds()
{
    var adContainers = document.body.getElementsByClassName("indieads");

    for (let i = 0; i < adContainers.length; i++) {
        spawnIndieAd(adContainers[i], AdResolutions.Portrait_600x900)
    }
}



spawnAds();