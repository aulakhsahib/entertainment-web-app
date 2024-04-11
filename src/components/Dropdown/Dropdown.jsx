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
            <svg width="10px" className="arrow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          ) : (
            <svg width="10px" className="arrow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
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
