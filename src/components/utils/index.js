export const IsMobile = () => {
    let regex = /Android|MeeGo|IEMobile|iPhone|iPad|iPod|BlackBerry|Opera Mini|phone|mobile|Nexus|HTC|Sony|Dell|Droid|Motorola|LG|Kindle|SAMSUNG|Pad|Bada|Tizen|Lumia|Touch|BB10|ARM|Windows Phone|Tablet|PlayBook|webOS|KFAPWI|MicroMessenger|MQQBrowser|baidubrowser|UC Browser/i;
    return regex.test(navigator.userAgent);
};
