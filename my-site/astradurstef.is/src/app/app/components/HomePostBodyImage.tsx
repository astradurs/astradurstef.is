"use client"
import React from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react"

export default function HomePostBodyImage({
  src,
  alt,
  height,
  width,
}: {
  src: string
  alt: string
  height: number
  width: number
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = () => {
    onOpen()
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 w-full">
        <Button
          onPress={() => handleOpen()}
          className="w-fit h-fit p-0 mx-auto"
          variant="light"
        >
          <Image
            className="mx-auto rounded-lg"
            src={src}
            width={width}
            height={height}
            alt={alt}
          />
        </Button>
      </div>
      <Modal
        className="max-w-5xl"
        backdrop={"opaque"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className="p-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 text-foreground justify-between">
                <span>{alt}</span>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalHeader>
              <ModalBody>
                <Image
                  className="mx-auto rounded-lg"
                  src={src}
                  width={width * 2}
                  height={height * 2}
                  alt={alt}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
