export default function Comissioner() {
  const observers = [
    "মেশকাত আহমেদ রাশেদ",
    "মো: মোফাজ্জেল হোসেন",
    "শিমুল হোসেন",
    "মো: মাসুম বিল্লাহ",
    "সজীব হাসান",
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 p-5">
      {/* Commissioner Card */}
      <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
          <h2 className="text-xl  text-gray-800 text-center mb-4 font-bold">
            Election Commissioner
          </h2>


        <div className=" text-gray-700 leading-6 w-full text-center">
          <p className="font-semibold">ড. মো: ফারিজুল ইসলাম</p>
          <p>সহযোগী অধ্যাপক, মার্কেটিং বিভাগ</p>
          <p>জগন্নাথ বিশ্ববিদ্যালয় (জবি)</p>
        </div>
      </div>

      {/* Observers Card */}
      <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
          <h2 className="text-xl  text-gray-800 text-center mb-4 font-bold">
            Election Observers
          </h2>

        <ul className=" space-y-2 text-gray-700">
          {observers.map((name, index) => (
            <li
              key={index}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="font-medium">{index + 1}.</span> {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
