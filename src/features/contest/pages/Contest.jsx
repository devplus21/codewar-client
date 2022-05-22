import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { getContests } from 'graphql/Queries';
import { React, useState } from 'react';
import ItemContest from '../components/ItemContest';

const options = [
  { id: 0, value: 'all', text: 'Tất cả' },
  { id: 1, value: 'happen', text: 'Đang diễn ra' },
  { id: 2, value: 'finish', text: 'Đã kết thúc' },
];

const Contest = () => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Trạng thái');
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(getContests);
  if (loading) return <PageLoading />;
  if (error) return <ServerError />;

  const items = data?.contests
    .filter((val) => {
      if (search === '') {
        return val;
      } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    })
    .filter((val) => {
      if (selected === 'Trạng thái') {
        return val;
      } else if (val.status.toLowerCase().includes(selected.toLowerCase())) {
        return val;
      }
    })
    .map(({ id, name, des, startDate, endDate, status, createdBy }) => ({
      id,
      name,
      des,
      startDate,
      endDate,
      status,
      createdBy,
    }));

  return (
    <div className="content">
      <div className="content_container">
        <div className="panel__title">Tất cả cuộc thi</div>
        <div className="panel__extra">
          <ul className="filter">
            <li>
              <div
                className="dropdowns"
                onMouseEnter={(e) => setIsActive(!isActive)}
                onMouseLeave={(e) => setIsActive(false)}
              >
                <div className="dropdowns__btn">
                  <span>{selected}</span>
                  <i className="bx bxs-down-arrow"></i>
                </div>
                {isActive && (
                  <div className="dropdowns__content">
                    {options.map((item) => (
                      <div
                        key={item.id}
                        className="dropdowns__content__item"
                        onClick={() => {
                          if (item.id === 0) {
                            setSelected('Trạng thái');
                            setIsActive(false);
                          } else {
                            setSelected(item.text);
                            setIsActive(false);
                          }
                        }}
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="input__wrapper">
                <input
                  autoComplete="off"
                  spellCheck="false"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Từ khóa"
                ></input>
                <i className="bx bx-search-alt-2"></i>
              </div>
            </li>
          </ul>
        </div>
        <ItemContest itemProps={items} />
      </div>
    </div>
  );
};

export default Contest;
