

function spawnAds()
{
    var adContainers = document.body.getElementsByClassName("indieads");

    for (let i = 0; i < adContainers.length; i++) {
        
        var linkElement = document.createElement("a");
        linkElement.target = "_blank";
        linkElement.className = "indiead-link"
        linkElement.id = `indieads-link-${i}`;
        
        var imgElement = document.createElement("img");
        imgElement.className = "indiead-img"
        imgElement.id = `indieads-img-${i}`;
        
        linkElement.append(imgElement);
        adContainers[i].append(linkElement);
        
        
        fetchIndieAd(linkElement.id, imgElement.id, AdResolutions.Portrait_600x900)
    }
}



spawnAds();