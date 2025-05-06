import React from "react";

const Attractions = () => {
  const spots = [
    {
      name: "한산도",
      image: "https://picsum.photos/400/300?random=1",
      description:
        "한산도는 통영항 동남방 7km에 위치한 섬으로, 임진왜란 당시 삼도수군통제영이 자리잡은 유서 깊은 섬이다. 세계 해전사에 빛나는 한산대첩의 무대이자, 이충무공의 호국정신이 살아 숨쉬는 역사 현장이다.",
    },
    {
      name: "소매물도",
      image: "https://picsum.photos/400/300?random=2",
      description:
        "서남쪽 해안의 기암괴석과 파도가 연출하는 장관으로 유명하다. 형제바위, 용바위 등 독특한 바위들과 함께 전복, 소라, 돌미역 등의 특산물, 사계절 내내 즐길 수 있는 다양한 어종으로 낚시객들에게 인기 있는 섬이다.",
    },
    {
      name: "봉암해수욕장",
      image: "https://picsum.photos/400/300?random=3",
      description:
        "몽돌로 이루어진 해변과 봉암수석으로 유명한 곳이다. 해안 산책로가 있어 바다와 자연을 동시에 즐길 수 있으며, 6.25 당시 포로수용소의 흔적도 남아 있는 역사적 장소다.",
    },
    {
      name: "제승당",
      image: "https://picsum.photos/400/300?random=4",
      description:
        "이순신 장군이 본영을 두고 작전을 세우던 운주당의 터에 세워진 제승당. 거북선을 본떠 만든 거북등대가 한려수도에 길을 밝히며, 역사의 숨결을 느낄 수 있는 성역이다.",
    },
    {
      name: "비진해수욕장",
      image: "https://picsum.photos/400/300?random=5",
      description:
        "500미터의 천연 백사장이 개미허리처럼 뻗어 있는 독특한 해수욕장이다. 맑은 수질과 얕은 수심, 100년 된 송림, 유명 낚시터가 어우러져 피서와 휴양지로 각광받는다.",
    },
  ];

  return (
    <section id="attractions" className="min-h-screen pt-[72px] bg-gray-100">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-yellow-900 mb-8">
            한산면 관광 명소
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 hover:shadow-xl"
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-yellow-800">
                    {spot.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed whitespace-pre-line">
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attractions;
