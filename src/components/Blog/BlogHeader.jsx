export default function BlogHeader({ title, description }) {
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h1>
            {description && (
                <p className="mt-3 text-sm sm:text-base 2xl:text-lg text-gray-500">{description}</p>
            )}
        </div>
    );
}