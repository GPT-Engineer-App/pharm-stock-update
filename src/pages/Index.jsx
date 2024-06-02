import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaUpload, FaCartPlus } from "react-icons/fa";

const Index = () => {
  const [stock, setStock] = useState([]);
  const [order, setOrder] = useState({});
  const toast = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").slice(1);
      const newStock = rows.map((row) => {
        const [name, quantity] = row.split(",");
        return { name, quantity: parseInt(quantity, 10) };
      });
      setStock(newStock);
      toast({
        title: "Stock updated.",
        description: "The stock has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
    reader.readAsText(file);
  };

  const handleOrderChange = (name, quantity) => {
    setOrder((prevOrder) => ({ ...prevOrder, [name]: quantity }));
  };

  const handlePlaceOrder = () => {
    const orderedItems = Object.entries(order).map(([name, quantity]) => ({ name, quantity }));
    console.log("Order placed:", orderedItems);
    toast({
      title: "Order placed.",
      description: "Your order has been successfully placed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Medicine Shop</Text>
        <Input type="file" accept=".csv" onChange={handleFileUpload} display="none" id="file-upload" />
        <Button as="label" htmlFor="file-upload" leftIcon={<FaUpload />} colorScheme="teal">
          Upload CSV to Update Stock
        </Button>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Medicine Name</Th>
              <Th>Available Quantity</Th>
              <Th>Order Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stock.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  <Input type="number" min="0" max={item.quantity} onChange={(e) => handleOrderChange(item.name, parseInt(e.target.value, 10))} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button leftIcon={<FaCartPlus />} colorScheme="teal" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
