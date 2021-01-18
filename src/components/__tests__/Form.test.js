import { render } from "@testing-library/react";
import Form from "../Form";
import userEvent from "@testing-library/user-event";

describe("Form", () => {
  it("create options from stations object for origin and destination dropdowns", () => {
    const stations = { "Paya Lebar": { EW: 1 } };
    const { getAllByText } = render(
      <Form
        stations={stations}
        setDestination={() => {}}
        setOrigin={() => {}}
      />
    );
    expect(getAllByText("Paya Lebar")).toHaveLength(2);
  });

  it("can call mock set origin function when origin is changed", () => {
    const stations = { "Paya Lebar": { EW: 1 } };
    const mockSetOrigin = jest.fn();
    const { getAllByText } = render(
      <Form
        stations={stations}
        setDestination={() => {}}
        setOrigin={mockSetOrigin}
      />
    );
    userEvent.click(getAllByText("Paya Lebar")[0]);
    expect(mockSetOrigin).toHaveBeenCalledWith("Paya Lebar");
  });

  it("can call mock set destination function when origin is changed", () => {
    const stations = { "Paya Lebar": { EW: 1 } };
    const mockSetDestination = jest.fn();
    const { getAllByText } = render(
      <Form
        stations={stations}
        setOrigin={() => {}}
        setDestination={mockSetDestination}
      />
    );
    userEvent.click(getAllByText("Paya Lebar")[1]);
    expect(mockSetDestination).toHaveBeenCalledWith("Paya Lebar");
  });
});
