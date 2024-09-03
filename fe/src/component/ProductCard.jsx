import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  IconButton,
  useToast,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = (product) => {
  const [update, setUpdate] = useState(product.product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const {
    product: { _id, name, image, price },
  } = product;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleUpdate = async (pid, product) => {
    const { success, message } = await updateProduct(pid, product);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow={"hidden"}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={image} alt={name} h={48} w="full" objectFit={"cover"} />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb="4">
          ${price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
          ></IconButton>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(_id)}
            colorScheme="red"
          ></IconButton>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={update.name}
                name="name"
                onChange={(e) => {
                  setUpdate({ ...update, name: e.target.value });
                }}
              />
              <Input
                placeholder="Price"
                value={update.price}
                name="price"
                onChange={(e) => {
                  setUpdate({ ...update, price: e.target.value });
                }}
              />
              <Input
                placeholder="image"
                value={update.image}
                name="image"
                onChange={(e) => {
                  setUpdate({ ...update, image: e.target.value });
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => handleUpdate(_id, update)}
              mr={3}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
