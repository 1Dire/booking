import React, { useEffect } from 'react';
import { useLoading } from "@/context/LoadingContext";  // 로딩 상태 가져오기
import { Loder } from "@/components/util/Loder";  // 로딩 컴포넌트
import Grid from '../components/util/grid/grid';
const Test = () => {

  return (
    <section id="test" className="pt-[72px] bg-gray-50">
      <Grid/>
    </section>
  );
};

export default Test;
