export const getPublicHolidays = async (year, month) => {
  const serviceKey =
    "T/d8Uy6ux75XTaJvS2NF92Ae17A+qrad6lkNLkeOMH+mYiR2LC988n6YErlV8HiILeg2VIAsarxGmzSa+NRakA==";
  const baseUrl =
    "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

  const queryParams = new URLSearchParams({
    serviceKey: serviceKey,
    solYear: year.toString(),
    solMonth: month.toString().padStart(2, "0"),
    _type: "json",
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const item = data.response?.body?.items?.item;

    // ⚠️ item이 배열이 아니면 배열로 감싸기
    if (!item) return [];
    return Array.isArray(item) ? item : [item];
  } catch (error) {
    console.error("공휴일 정보 불러오기 실패:", error);
    return [];
  }
};
