const PunchClock = () => {
    return (
        <div className="w-full h-full flex justify-center items-start gap-6 p-6  text-gray-800">
            {/* Левая карточка */}
            <div className="flex-1 max-w-xl bg-white shadow-md rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Punch In</h2>

                <form className="flex flex-col gap-4">
                    {/* Staff Member */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Staff Member *</label>
                        <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>test</option>
                            <option>John</option>
                        </select>
                    </div>

                    {/* Client */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Client *</label>
                        <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Joseph</option>
                            <option>Emma</option>
                        </select>
                    </div>

                    {/* Office Location */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Office Location *</label>
                        <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Remote</option>
                            <option>On-site</option>
                        </select>
                    </div>

                    {/* Work Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Work Description</label>
                        <textarea
                            className="border border-gray-300 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your work..."></textarea>
                    </div>

                    <button className="flex items-center justify-center gap-2 px-4 py-3 mt-4 text-sm font-medium bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
                        Punch In
                    </button>
                </form>
            </div>

            {/* Правая карточка */}
            <div className="flex-1 max-w-md bg-white shadow-md rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Currently Working</h2>
                <p className="text-gray-500 italic">No one is currently punched in</p>
            </div>
        </div>
    );
};

export default PunchClock;
