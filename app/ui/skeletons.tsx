export function ProfileSkeleton(){
    return(
        <>
        <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="text-sm text-gray-600">Loading Profile...</p>
        </div>
        </>
    )
}