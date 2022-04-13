import SearchSkeleton from 'components/Placeholders/SearchSkeleton';
import React from 'react'

type propsType = {
    onShow: () => void;
    params?: any[]
}

function LoadMoreObserver({onShow, params}: propsType) {
    const [timeToLoadingMore, setTimeToLoadingMore] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => {
            setTimeToLoadingMore(true)
        }, 100);
        return () => setTimeToLoadingMore(false)
    }, [params])
    React.useEffect(() => {
        if (!timeToLoadingMore) return
        const options = { threshold: 0.1 };
        const target = document.querySelector("#observer");
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && timeToLoadingMore) {
                    onShow()
                    setTimeToLoadingMore(false)
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(target as Element);
        return () => {
            observer.disconnect()
        }
    }, [timeToLoadingMore])

    return (
        <div id="observer" style={{paddingTop: "24px"}}>
            <SearchSkeleton />
        </div>
    )
}

export default LoadMoreObserver
