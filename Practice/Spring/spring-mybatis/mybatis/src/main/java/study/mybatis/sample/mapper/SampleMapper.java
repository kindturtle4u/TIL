package study.mybatis.sample.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SampleMapper {
    List<?> selectSampleList();
}
