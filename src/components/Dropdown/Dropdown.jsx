/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import "./Dropdown.css";
import useEffectOnce from "../../hooks/useEffectOnce.jsx";
import useEventListener from "../../hooks/useEventListener.jsx";
import upArrow from "../../assets/chevron-up.svg";
import downArrow from "../../assets/chevron-down.svg";

export default function Dropdown({
  id,
  options,
  selectionLabel,
  value,
  modifyDropdownState,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValueLabel, setSelectedValueLabel] = useState(null);
  const dropdownContainer = useRef(null);

  const handleOptionClick = ({ label, value }) => {
    modifyDropdownState(id, value);
    setSelectedValueLabel(label);
    setIsOpen(!isOpen);
  };

  const setDropdownLabelAndValue = () => {
    if (!selectionLabel) {
      modifyDropdownState(id, options[0].value);
      setSelectedValueLabel(options[0].label);
    }
  };

  const handleBodyClick = (e) => {
    if (!dropdownContainer.current) return;
    if (!dropdownContainer.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffectOnce(setDropdownLabelAndValue);

  useEventListener("click", handleBodyClick, document.body);

  return (
    <>
      <div className="dropdown-parent-container" ref={dropdownContainer}>
        <div
          className="dropdown-label-container"
          onClick={() => setIsOpen(!isOpen)}
          style={{ position: "relative" }}
        >
          <p className="dropdown-label">
            {selectedValueLabel || selectionLabel}
          </p>
          {isOpen ? (
            <img src={upArrow} width="10px" alt="" />
          ) : (
            <img width="10px" src={downArrow} />
          )}
        {isOpen && (
          <ul className="options-list">
            {options.map((o, index) => (
              <li key={index} onClick={() => handleOptionClick(o)}>
                {o.label}
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </>
  );
}
