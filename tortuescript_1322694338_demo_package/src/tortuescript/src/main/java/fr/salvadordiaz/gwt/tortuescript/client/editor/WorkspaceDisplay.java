package fr.salvadordiaz.gwt.tortuescript.client.editor;

import com.google.gwt.event.dom.client.HasClickHandlers;
import com.google.gwt.user.client.ui.HasText;
import com.google.gwt.user.client.ui.IsWidget;

public interface WorkspaceDisplay extends IsWidget {

	HasText getCodeEditor();

	HasClickHandlers getExecuteButton();

	HasClickHandlers getSaveButton();

	HasText getNameEditor();

	void newCommand();

	void penDown();

	void penUp();

	void home();

	void setX(double newX);

	void setY(double newY);

	void forward(double height);

	void backward(double height);

	void left(double angle);

	void right(double angle);

	void penColor(String stringColor);

	void penColor(int red, int green, int blue, int alpha);

	void canvasColor(String stringColor);

	void canvasColor(int red, int green, int blue, int alpha);

	void drawString(String string);

	void fontSize(int fontSize);

	void fontStyle(String fontStyle);

	void fontName(String fontName);

}
