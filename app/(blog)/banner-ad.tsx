interface BannerAdProps {
    cityName: string
    primaryColor?: string
    secondaryColor?: string
}

export default function BannerAd({
    cityName = "New York",
    primaryColor = "#3b82f6", // Blue
    secondaryColor = "#1e3a8a" // Dark Blue
}: BannerAdProps) {
    return (
        <div
            className="relative w-full h-48 overflow-hidden shadow-lg"
            style={{ backgroundColor: primaryColor }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2
                    className="text-3xl font-bold mb-1 text-center px-4"
                    style={{ animationDelay: '200ms' }}
                >
                    Visit {cityName}
                </h2>
                <p
                    className="text-lg text-center px-4"
                    style={{ animationDelay: '400ms' }}
                >
                    Experience the magic of the world's most trendy city!
                </p>
            </div>
        </div>
    )
}