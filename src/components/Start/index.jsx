import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { Container, Section, Top, Wrapper } from "./style";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncCategories,
  fetchAsyncQuestions,
} from "../../store/slices/quiz-slice";

const Start = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.quiz.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [count, setCount] = useState(10);
  const handleChange = (value) => setSelectedCategory(value);

  useEffect(() => {
    if (categories.length) setSelectedCategory(categories?.[0]?.id);
  }, [categories]);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Top>
          <Section>
            <h3>Select category:</h3>
            <Select
              value={selectedCategory}
              style={{
                width: 220,
              }}
              onChange={handleChange}
            >
              {categories.length > 0 &&
                categories.map(({ id, name }) => (
                  <Option value={id} key={id}>
                    {name}
                  </Option>
                ))}
            </Select>
          </Section>

          <Section>
            <h3>Select count:</h3>
            <Select
              value={count}
              style={{
                width: 220,
              }}
              onChange={(num) => setCount(num)}
            >
              <Option value={10}>10</Option>
              <Option value={15}>15</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
          </Section>
        </Top>

        <Link to="/quiz">
          <Button
            color={"coral"}
            onClick={() =>
              dispatch(fetchAsyncQuestions({ count, selectedCategory }))
            }
          >
            Start
          </Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Start;
